import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonetService, MonetPack, MonetTransaction } from '../../services/monet.service';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal.component';
import { TransactionHistoryComponent } from '../../components/transaction-history/transaction-history.component';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, PurchaseModalComponent, TransactionHistoryComponent],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent {
  packs: MonetPack[] = [
    { id: 'p20', monets: 20, price: 2.99, label: 'სწრაფი ტოპ-აპი', badge: '' , icon: '⚡', centsPer: 0.15 },
    { id: 'p50', monets: 50, price: 5.99, label: 'საუკეთესო ფასი', badge: 'ყველაზე პოპულარული', icon: '⭐', centsPer: 0.12 },
    { id: 'p100', monets: 100, price: 9.99, label: 'პაუერ ტრეიდერი', badge: '' , icon: '👑', centsPer: 0.10 },
    { id: 'p250', monets: 250, price: 19.99, label: 'ულტრა პაკი', badge: '' , icon: '✨', centsPer: 0.08 },
  ];

  selectedPack: MonetPack = this.packs[1]; // default 50
  modalOpen = false;

  balance = 7; // demo
  dailyMax = 10; // demo

  transactions: MonetTransaction[] = [
    { id: 't1', type: 'daily', amount: +10, date: '2026-03-01 10:30' },
    { id: 't2', type: 'spent', amount: -1, date: '2026-03-01 13:12' },
    { id: 't3', type: 'purchase', amount: +50, date: '2026-03-02 15:10' },
  ];

  constructor(private monet: MonetService) {}

  selectPack(p: MonetPack) {
    this.selectedPack = p;
  }

  openPurchase() {
    this.modalOpen = true;
  }

  closePurchase() {
    this.modalOpen = false;
  }

  confirmPurchase() {
    // Later: integrate Stripe + backend
    this.balance += this.selectedPack.monets;

    this.transactions = [
      {
        id: 't' + (this.transactions.length + 1),
        type: 'purchase',
        amount: +this.selectedPack.monets,
        date: new Date().toLocaleString(),
      },
      ...this.transactions,
    ];

    this.modalOpen = false;
  }
}