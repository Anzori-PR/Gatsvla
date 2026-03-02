import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonetPack } from '../../services/monet.service';

@Component({
  selector: 'app-purchase-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css'],
})
export class PurchaseModalComponent {
  @Input() open = false;
  @Input() pack!: MonetPack;
  @Input() balance = 0;
  @Input() dailyMax = 10;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onBackdropClick() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}