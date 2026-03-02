import { Injectable } from '@angular/core';

export type MonetPack = {
  id: string;
  monets: number;
  price: number;
  label: string;
  badge: string;
  icon: string;
  centsPer: number;
};

export type MonetTransaction = {
  id: string;
  type: 'purchase' | 'spent' | 'daily';
  amount: number; // + or -
  date: string;
};

@Injectable({ providedIn: 'root' })
export class MonetService {
  // Later: call backend endpoints
  getBalance() {
    return 7;
  }
}