import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageCounterService } from './LocalStorageService';
import { CounterApiServiceResponse } from './CounterApiServiceResponse';

@Injectable({
  providedIn: 'root',
})
export class CounterApiService {
  /*
    TODO: Remove this injection after connect with database. This serviceCache
    its only been used to simulation of database
    */
  constructor(private localStorageService: LocalStorageCounterService) {}

  private getUserCounterDB(): number{

    let userCounterCacheValue: string | null = localStorage.getItem('user_counter_db');

    let currentUserCounter = userCounterCacheValue ? parseInt(userCounterCacheValue) : 0;

    return currentUserCounter;
  }
  
  private getGlobalCounterDB(): number{

    let globalCounterCacheValue: string | null = localStorage.getItem('global_counter_db');

    let currentGlobalCounter = globalCounterCacheValue ? parseInt(globalCounterCacheValue) : 0;

    return currentGlobalCounter;
  }



  saveCounter(
    counterType: 'personal' | 'global',
    clicksToAdd: number
  ): Observable<CounterApiServiceResponse> {
    switch (counterType) {
      case 'personal':
        let newPersonalCounter =
        this.getUserCounterDB() + clicksToAdd;
        localStorage.setItem('user_counter_db', newPersonalCounter.toString());
        console.log(`Personal counter updated: ${newPersonalCounter}`);
        return of(
          new CounterApiServiceResponse(
            'sucess',
            'Personal counter updated',
            newPersonalCounter
          )
        );
      case 'global':
        let newGlobalCounter =
        this.getGlobalCounterDB() + clicksToAdd;
        localStorage.setItem('global_counter_db', newGlobalCounter.toString());
        console.log(`Global counter updated: ${newGlobalCounter}`);
        return of(new CounterApiServiceResponse(
          'sucess',
          'Global counter updated',
          newGlobalCounter
        ));
      
      default:
        console.error('Invalid counter type');
        return of(new CounterApiServiceResponse(
          'error',
          'Invalid counter type'
        ));
    }
  }
}
