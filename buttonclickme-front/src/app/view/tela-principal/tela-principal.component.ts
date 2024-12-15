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
  globalCounter: number = 0;

  constructor(private localStorageService: LocalStorageCounterService) {}

  ngOnInit(): void {
    this.initCounters();
  }

  private initCounters() {
    this.userCounter = this.localStorageService.getUserCounter();

    this.globalCounter = this.localStorageService.getGlobalCounter();
  }

  public incrementCounter(): void {
    this.userCounter = this.localStorageService.incrementUserCounter(1);

    this.globalCounter = this.localStorageService.incrementGlobalCounter(1);
  }
}
