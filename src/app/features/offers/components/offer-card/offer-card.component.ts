import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../../services/offer.service';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: Offer;
  @Input() hint = '';

  @Output() accept = new EventEmitter<string>();
  @Output() decline = new EventEmitter<string>();
  @Output() counter = new EventEmitter<Offer>();
  @Output() cancel = new EventEmitter<string>(); // for sent

  get initial() {
    const name = this.offer.direction === 'received' ? this.offer.fromUser.name : this.offer.toUser.name;
    return (name?.trim()?.[0] ?? '?').toUpperCase();
  }

  get otherName() {
    return this.offer.direction === 'received' ? this.offer.fromUser.name : this.offer.toUser.name;
  }

  totalValue(items: { value: number }[]) {
    return items.reduce((sum, it) => sum + (it.value ?? 0), 0);
  }

  statusLabel() {
    if (this.offer.status === 'pending') return 'მოლოდინში';
    if (this.offer.status === 'accepted') return 'მიღებულია';
    if (this.offer.status === 'declined') return 'უარყოფილია';
    if (this.offer.status === 'countered') return 'კონტრშეთავაზება';
    return 'გაუქმებულია';
  }
}