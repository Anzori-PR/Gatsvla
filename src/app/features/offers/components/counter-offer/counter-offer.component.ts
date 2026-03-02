import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Offer, OfferItem } from '../../services/offer.service';

@Component({
  selector: 'app-counter-offer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-offer.component.html',
  styleUrls: ['./counter-offer.component.css'],
})
export class CounterOfferComponent {
  @Input() open = false;
  @Input() offer: Offer | null = null;
  @Input() myItems: OfferItem[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{ message: string; requestedItems: OfferItem[] }>();

  message = '';
  selected = new Set<string>();

  toggle(id: string) {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
  }

  isSelected(id: string) {
    return this.selected.has(id);
  }

  confirm() {
    const requested = this.myItems.filter(i => this.selected.has(i.id));
    this.submit.emit({ message: this.message, requestedItems: requested });
    this.message = '';
    this.selected.clear();
  }
}