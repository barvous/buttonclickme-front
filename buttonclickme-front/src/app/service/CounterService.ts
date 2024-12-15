import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageCounterService } from './LocalStorageService';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor(private localStorageService: LocalStorageCounterService) {}

  saveCounter(
    counterType: 'personal' | 'global',
    clicksToAdd: number
  ): Observable<any> {
    switch (counterType) {
      case 'personal':
        let newPersonalCounter =
          this.localStorageService.incrementUserCounter(clicksToAdd);
        console.log(`Personal counter updated: ${newPersonalCounter}`);
        return of({
          status: 'success',
          message: 'Personal counter updated',
          newValue: newPersonalCounter,
        });

      case 'global':
        let newGlobalCounter =
          this.localStorageService.incrementGlobalCounter(clicksToAdd);
        console.log(`Global counter updated: ${newGlobalCounter}`);
        return of({
          status: 'success',
          message: 'Global counter updated',
          newValue: newGlobalCounter,
        });

      default:
        console.error('Invalid counter type');
        return of({ status: 'error', message: 'Invalid counter type' });
    }
  }
}
