import { Component, Input } from '@angular/core';

export interface ItemCardModel {
  image: string;
  title: string;
  condition: string;     // "Like New" | "New" | "Good" etc.
  location: string;      // "Manhattan, NY"
  ownerName: string;     // "Sarah M."
  rating: number;        // 4.8
  lookingFor: string;   // "electronics"
}

@Component({
  standalone: true,
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})

export class ItemCardComponent {
  @Input() item!: ItemCardModel;

  // Auto-generate avatar initial if you want
  get ownerInitial(): string {
    return this.item?.ownerName?.charAt(0)?.toUpperCase() || '?';
  }
}
