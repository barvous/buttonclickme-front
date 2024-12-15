import { ConstantLocalStorageKeys } from '../constant/LocalStorageKeys';

export class LocalStorageCounterService {

  public resetCountersCache(){
    localStorage.setItem(ConstantLocalStorageKeys.USER_COUNTER, "0");
    
    localStorage.setItem(ConstantLocalStorageKeys.GLOBAL_COUNTER, "0");
  }

  public getUserCounter(): number {
    let userCounterCacheValue: string | null = localStorage.getItem(
      ConstantLocalStorageKeys.USER_COUNTER
    );

    return userCounterCacheValue ? parseInt(userCounterCacheValue) : 0;
  }

  public getGlobalCounter(): number {
    let globalCounterCacheValue: string | null = localStorage.getItem(
      ConstantLocalStorageKeys.GLOBAL_COUNTER
    );

    return globalCounterCacheValue ? parseInt(globalCounterCacheValue) : 0;
  }

  public incrementUserCounter(numberToAdd: number): number {
    let newUserCounter = this.getUserCounter() + numberToAdd;
    localStorage.setItem(
      ConstantLocalStorageKeys.USER_COUNTER,
      newUserCounter.toString()
    );

    return newUserCounter;
  }

  public incrementGlobalCounter(numberToAdd: number): number {
    let newGlobalCounter = this.getGlobalCounter() + numberToAdd;
    localStorage.setItem(
      ConstantLocalStorageKeys.GLOBAL_COUNTER,
      newGlobalCounter.toString()
    );

    return newGlobalCounter;
  }
}
