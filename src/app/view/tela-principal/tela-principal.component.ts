import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AntiCheatService } from '../../service/AntiCheatService';
import { CounterApiService } from '../../service/CounterApiService';
import { CounterApiServiceResponse } from '../../service/CounterApiServiceResponse';
import { LocalStorageCounterService } from '../../service/LocalStorageService';
import { DialogComportamentoSuspeitoComponent } from '../dialog-comportamento-suspeito/dialog-comportamento-suspeito.component';

type CounterType = 'personal' | 'global';

const COUNTER_TYPE_PERSONAL: CounterType = 'personal';
const COUNTER_TYPE_GLOBAL: CounterType = 'global';
const USER_CHEATED_LOCAL_STORAGE: string = 'is_cheat';

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
  isButtonDisabled: boolean = false; // Estado do botão para bloqueio

  private saveTimeout: any;
  private SAVE_DELAY = 1500; // 1.5 segundos

  constructor(
    private localStorageService: LocalStorageCounterService,
    private counterApiService: CounterApiService,
    private antiCheatService: AntiCheatService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initCounters();

    let isUserCheatedLocalStorage: string | null = localStorage.getItem(
      USER_CHEATED_LOCAL_STORAGE
    );
    let isUserCheated: boolean = isUserCheatedLocalStorage === 'true';

    if (isUserCheated) {
      this.openDialogComportamentoSuspeitoComponent();
    }
  }

  openDialogComportamentoSuspeitoComponent(): void {
    let dialogRef: MatDialogRef<DialogComportamentoSuspeitoComponent> =
      this.dialog.open(DialogComportamentoSuspeitoComponent, {
        width: '400px',
      });

    dialogRef.beforeClosed().subscribe((response: any) => {
      localStorage.setItem(USER_CHEATED_LOCAL_STORAGE, 'false');
    });
  }

  private initCounters() {
    let currentUserCounter: string | null =
      localStorage.getItem('user_counter_db');
    this.userCounter = currentUserCounter ? parseInt(currentUserCounter) : 0;
    this.mainUserCounter = currentUserCounter
      ? parseInt(currentUserCounter)
      : 0;

    let currentGlobalCounter: string | null =
      localStorage.getItem('global_counter_db');
    this.globalCounter = currentGlobalCounter
      ? parseInt(currentGlobalCounter)
      : 0;
  }

  public saveCounters() {
    if (this.isButtonDisabled == true) {
      this.openDialogComportamentoSuspeitoComponent();
      return;
    }

    let isClickAllowed: boolean = this.antiCheatService.isClickAllowed(
      this.mainUserCounter
    );

    if (!isClickAllowed) {
      window.location.reload();
      localStorage.setItem(USER_CHEATED_LOCAL_STORAGE, 'true');

      return;
    }

    this.numberToAdd++;
    this.mainUserCounter++;

    this.localStorageService.incrementUserCounter(1);
    this.localStorageService.incrementGlobalCounter(1);

    this.initTimeToSaveInDB(this.numberToAdd);
  }

  private initTimeToSaveInDB(numberToAdd: number): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.saveCountersInDB(numberToAdd);
    }, this.SAVE_DELAY);
  }

  private saveCountersInDB(numberToAdd: number): void {
    console.log('Salvando contadores no banco de dados...');

    this.counterApiService
      .saveCounter(COUNTER_TYPE_PERSONAL, numberToAdd)
      .subscribe({
        next: (response: CounterApiServiceResponse) => {
          if (response.status === 'error') {
            throw Error('An unexpected error occurs: ' + response.message);
          }
          this.userCounter = response.newValue;
        },
        error: (err) => {
          console.error('An unexpected error occurs: ', err.error);
        },
      });

    this.counterApiService
      .saveCounter(COUNTER_TYPE_GLOBAL, numberToAdd)
      .subscribe({
        next: (response: CounterApiServiceResponse) => {
          if (response.status === 'error') {
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
