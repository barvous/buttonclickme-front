export class CounterApiServiceResponse {
  status!: string;
  message!: string;
  newValue!: number;

  // Sobrecarga de construtor
  constructor(status: string, message: string, newValue: number);
  constructor(status: string, message: string);
  
  // Implementação do construtor
  constructor(status: string, message: string, newValue?: number) {
    this.status = status;
    this.message = message;
    if (newValue !== undefined) {
      this.newValue = newValue;
    }
  }

}
