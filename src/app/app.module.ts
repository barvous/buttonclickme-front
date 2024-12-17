import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageCounterService } from './service/LocalStorageService';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, MatDialogModule],
  providers: [LocalStorageCounterService],
})
export class AppModule {}
