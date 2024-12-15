import { Component, Injectable, OnInit } from '@angular/core';
import { LocalStorageCounterService } from '../../service/LocalStorageService';
import { CounterApiService } from '../../service/CounterApiService';
import { CounterApiServiceResponse } from '../../service/CounterApiServiceResponse';

type CounterType = 'personal' | 'global';

const COUNTER_TYPE_PERSONAL: CounterType = 'personal';
const COUNTER_TYPE_GLOBAL: CounterType = 'global';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-tela-principal',
  imports: [],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css',
  providers: [LocalStorageCounterService, CounterApiService],
})
export class TelaPrincipalComponent implements OnInit {
  userCounter: number = 0;
  mainUserCounter: number = 0;
  globalCounter: number = 0;
  numberToAdd: number = 0;

  private saveTimeout: any;
  private SAVE_DELAY = 1500; // 1.5 segundos

  constructor(
    private localStorageService: LocalStorageCounterService,
    private counterApiService: CounterApiService
  ) {}

  ngOnInit(): void {
    this.initCounters();
  }

  private initCounters() {
    
    let currentUserCounter: string | null = localStorage.getItem("user_counter_db");
    this.userCounter = currentUserCounter ? parseInt(currentUserCounter) : 0;
    this.mainUserCounter = currentUserCounter ? parseInt(currentUserCounter) : 0;

    let currentGlobalCounter: string | null = localStorage.getItem("global_counter_db");
    this.globalCounter = currentGlobalCounter ? parseInt(currentGlobalCounter) : 0;
  }

  public saveCounters() {
    this.numberToAdd++;
    this.mainUserCounter++;

    this.localStorageService.incrementUserCounter(1);
    this.localStorageService.incrementGlobalCounter(1);

    this.initTimeToSaveInDB(this.numberToAdd);
  }

  private initTimeToSaveInDB(numberToAdd: number): void {
    // Limpa o temporizador anterior
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    // Inicia um novo temporizador
    this.saveTimeout = setTimeout(() => {
      this.saveCountersInDB(numberToAdd);
    }, this.SAVE_DELAY);
  }

  private saveCountersInDB(numberToAdd: number): void {
    console.log('Salvando contadores no banco de dados...');

    //TODO: move this save logic to counterApiService
    this.counterApiService
      .saveCounter(COUNTER_TYPE_PERSONAL, numberToAdd)
      .subscribe({
        next: (response: CounterApiServiceResponse) => {
          if (response.status == 'error') {
            throw Error('An unexpected error occurs: ' + response.message);
          }

          this.userCounter = response.newValue;
        },
        error: (err) => {
          console.error('An unexpected error occurs: ', err.error);
        },
      });

    //TODO: move this save logic to counterApiService
    this.counterApiService
      .saveCounter(COUNTER_TYPE_GLOBAL, numberToAdd)
      .subscribe({
        next: (response: CounterApiServiceResponse) => {
          if (response.status == 'error') {
            throw Error('An unexpected error occurs: ' + response.message);
          }

          this.globalCounter = response.newValue;
        },
        error: (err) => {
          console.error('An unexpected error occurs: ', err.error);
        },
      });

    console.log(
      `User Counter: ${this.userCounter}, Global Counter: ${this.globalCounter}`
    );

    this.localStorageService.resetCountersCache();
    this.numberToAdd = 0;
  }
}
