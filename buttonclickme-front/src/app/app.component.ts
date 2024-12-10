import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaPrincipalComponent } from "./tela-principal/tela-principal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TelaPrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buttonclickme-front';
}
