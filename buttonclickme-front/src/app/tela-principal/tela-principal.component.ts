import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-principal',
  imports: [],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css'
})
export class TelaPrincipalComponent {
  userCounter: number = 0;
  globalCounter: number = 1487;

  incrementCounter(): void {
    this.userCounter++;
    this.globalCounter++;
  }
}
