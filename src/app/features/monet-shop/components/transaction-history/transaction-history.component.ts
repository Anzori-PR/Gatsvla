import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonetTransaction } from '../../services/monet.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent {
  @Input() transactions: MonetTransaction[] = [];

  label(t: MonetTransaction['type']) {
    if (t === 'purchase') return 'შეძენა';
    if (t === 'daily') return 'დღიური ბონუსი';
    return 'დახარჯვა';
  }
}