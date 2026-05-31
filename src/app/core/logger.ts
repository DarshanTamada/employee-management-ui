import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {

  info(message: string): void {
    console.info(`[INFO] ${new Date().toISOString()}: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  }
}
