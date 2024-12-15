import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageCounterService } from './service/LocalStorageService';

@NgModule({
  declarations: [],
  imports: [BrowserModule],
  providers: [LocalStorageCounterService], // Adicione aqui o serviço
})
export class AppModule {}
