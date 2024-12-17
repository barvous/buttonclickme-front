import { Injectable } from '@angular/core';

const MAX_CLICKS = 30; // Número de cliques a serem monitorados
const SIMILARITY_THRESHOLD = 10; // Intervalo de tempo em ms para considerar similaridade
const MAX_CLICKS_PER_SECOND = 15; // Limite de cliques por segundo para detecção de robôs
const RANGE_THRESHOLD = 20; // Tolerância de intervalo em ms para cima e para baixo

@Injectable({
  providedIn: 'root',
})
export class AntiCheatService {
  private clickTimestamps: number[] = [];
  private lastValidClickCount: number = 0; // Salva a última contagem válida de cliques
  private isBlocked: boolean = false; // Estado para saber se o botão está bloqueado

  constructor() {}

  public isClickAllowed(currentClickCount: number): boolean {
    const now = Date.now();
    this.clickTimestamps.push(now);

    // Mantém apenas os últimos MAX_CLICKS timestamps
    if (this.clickTimestamps.length > MAX_CLICKS) {
      this.clickTimestamps.shift();
    }

    // Verifica comportamentos suspeitos
    if (this.clickTimestamps.length === MAX_CLICKS) {
      const intervals = this.calculateIntervals(this.clickTimestamps);

      if (this.isRobotDetected(intervals)) {
        console.warn('Comportamento suspeito detectado: Intervalos muito similares entre os cliques.', intervals);
        this.blockClicks(currentClickCount);
        return false;
      }

      if (this.hasExactIntervals(intervals)) {
        console.warn('Comportamento suspeito detectado: Intervalos idênticos entre os cliques.', intervals);
        this.blockClicks(currentClickCount);
        return false;
      }

      if (this.isConstantInterval(intervals)) {
        console.warn('Comportamento suspeito detectado: Intervalos constantes dentro de um range.', intervals);
        this.blockClicks(currentClickCount);
        return false;
      }

      if (this.isClickSpeedHigh()) {
        console.warn('Comportamento suspeito detectado: Velocidade de clique muito alta.', {
          clicksPerSecond: this.calculateClicksPerSecond(),
          intervals: intervals
        });
        this.blockClicks(currentClickCount);
        return false;
      }
    }

    this.isBlocked = false;
    this.lastValidClickCount = currentClickCount;
    return true;
  }

  public isButtonBlocked(): boolean {
    return this.isBlocked;
  }

  private calculateIntervals(timestamps: number[]): number[] {
    const intervals: number[] = [];
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i - 1]);
    }
    return intervals;
  }

  private isRobotDetected(intervals: number[]): boolean {
    const firstInterval = intervals[0];
    return intervals.every(interval => Math.abs(interval - firstInterval) <= SIMILARITY_THRESHOLD);
  }

  private hasExactIntervals(intervals: number[]): boolean {
    const firstInterval = intervals[0];
    return intervals.every(interval => interval === firstInterval);
  }

  private isConstantInterval(intervals: number[]): boolean {
    const firstInterval = intervals[0];
    return intervals.every(interval =>
      interval >= firstInterval - RANGE_THRESHOLD && interval <= firstInterval + RANGE_THRESHOLD
    );
  }

  private isClickSpeedHigh(): boolean {
    const clicksPerSecond = this.calculateClicksPerSecond();
    return clicksPerSecond >= MAX_CLICKS_PER_SECOND;
  }

  private calculateClicksPerSecond(): number {
    const timeSpan = this.clickTimestamps[this.clickTimestamps.length - 1] - this.clickTimestamps[0];
    return MAX_CLICKS / (timeSpan / 1000);
  }

  private blockClicks(currentClickCount: number): void {
    console.warn(`Clique suspeito detectado! Contagem de cliques foi resetada para o último valor válido: ${this.lastValidClickCount}`);
    this.clickTimestamps = [];
    this.isBlocked = true; // Define o estado de bloqueio
  }
}