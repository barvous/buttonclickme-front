import { Component, Injectable, OnInit } from '@angular/core';
import { LocalStorageCounterService } from '../../service/LocalStorageService';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-tela-principal',
  imports: [],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css',
  providers: [LocalStorageCounterService],
})
export class TelaPrincipalComponent implements OnInit {
  userCounter: number = 0;
  mainUserCounter: number = 0;
  globalCounter: number = 0;
  numberToAdd: number = 0;

  private saveTimeout: any;
  private SAVE_DELAY = 1500; // 1.5 segundos

  constructor(private localStorageService: LocalStorageCounterService) {}

  ngOnInit(): void {
    this.initCounters();
  }

  private initCounters() {
    let currentUserCounter: number = this.localStorageService.getUserCounter();
    this.userCounter = currentUserCounter;
    this.mainUserCounter = currentUserCounter;

    this.globalCounter = this.localStorageService.getGlobalCounter();
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

    this.userCounter = this.localStorageService.getUserCounter();
    this.globalCounter = this.localStorageService.getGlobalCounter();

    console.log(
      `User Counter: ${this.userCounter}, Global Counter: ${this.globalCounter}`
    );

    this.numberToAdd = 0;
  }
}
