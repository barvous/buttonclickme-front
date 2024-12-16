import { Component } from '@angular/core';
import { TelaPrincipalComponent } from "./view/tela-principal/tela-principal.component";

@Component({
  selector: 'app-root',
  imports: [TelaPrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buttonclickme-front';
}