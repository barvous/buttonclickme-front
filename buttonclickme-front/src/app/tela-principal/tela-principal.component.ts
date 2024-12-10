import { Component, OnInit } from '@angular/core';

const USER_COUNTER_LOCAL_STORAGE_KEY = 'user_counter';
const GLOBAL_COUNTER_LOCAL_STORAGE_KEY = 'global_counter';

@Component({
  selector: 'app-tela-principal',
  imports: [],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css',
})
export class TelaPrincipalComponent implements OnInit {
  userCounter: number = 0;
  globalCounter: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.initCounters();
  }

  private initCounters() {
    this.userCounter = this.getCounterFromLocalStorage(
      USER_COUNTER_LOCAL_STORAGE_KEY
    );

    this.globalCounter = this.getCounterFromLocalStorage(
      GLOBAL_COUNTER_LOCAL_STORAGE_KEY
    );
  }

  private getCounterFromLocalStorage(localStorageKey: string): number {
    let cacheValue: string | null = localStorage.getItem(localStorageKey);

    return cacheValue ? parseInt(cacheValue) : 0;
  }

  public incrementCounter(): void {
    this.userCounter++;
    this.globalCounter++;

    localStorage.setItem(
      USER_COUNTER_LOCAL_STORAGE_KEY,
      this.userCounter.toString()
    );
    
    localStorage.setItem(
      GLOBAL_COUNTER_LOCAL_STORAGE_KEY,
      this.globalCounter.toString()
    );
  }
}
