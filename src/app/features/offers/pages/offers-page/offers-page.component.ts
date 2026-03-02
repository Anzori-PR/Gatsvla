import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Offer, OfferItem, OfferService } from '../../services/offer.service';
import { OfferCardComponent } from '../../components/offer-card/offer-card.component';
import { CounterOfferComponent } from '../../components/counter-offer/counter-offer.component';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [CommonModule, OfferCardComponent, CounterOfferComponent],
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css'],
})
export class OffersPageComponent implements OnDestroy {
  offers: Offer[] = [];
  tab: 'received' | 'sent' | 'history' = 'received';

  monets = 0;

  counterOpen = false;
  counterTarget: Offer | null = null;

  myItems: OfferItem[] = [
    { id: 'm1', title: 'Smart Watch', image: 'assets/images/smartwatch.jpg', condition: 'Like New', value: 350 },
    { id: 'm2', title: 'Turntable', image: 'assets/images/turntable.jpg', condition: 'Fair', value: 220 },
    { id: 'm3', title: 'Ceramic Mug', image: 'assets/images/mug.jpg', condition: 'New', value: 35 },
  ];

  private sub?: Subscription;
  private sub2?: Subscription;

  constructor(private offerService: OfferService) {
    this.sub = this.offerService.offers$.subscribe(list => (this.offers = list));
    this.sub2 = this.offerService.monets$.subscribe(v => (this.monets = v));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  get filtered() {
    const isHistory = (o: Offer) => o.status !== 'pending';

    if (this.tab === 'received') return this.offers.filter(o => o.direction === 'received' && o.status === 'pending');
    if (this.tab === 'sent') return this.offers.filter(o => o.direction === 'sent' && o.status === 'pending');
    return this.offers.filter(isHistory);
  }

  // counts for pills
  countReceivedPending() {
    return this.offers.filter(o => o.direction === 'received' && o.status === 'pending').length;
  }
  countSentPending() {
    return this.offers.filter(o => o.direction === 'sent' && o.status === 'pending').length;
  }
  countHistory() {
    return this.offers.filter(o => o.status !== 'pending').length;
  }

  accept(id: string) {
    this.offerService.acceptOffer(id);
  }

  decline(id: string) {
    this.offerService.declineOffer(id);
  }

  cancel(id: string) {
    this.offerService.cancelOffer(id);
  }

  openCounter(offer: Offer) {
    this.counterTarget = offer;
    this.counterOpen = true;
  }

  closeCounter() {
    this.counterOpen = false;
    this.counterTarget = null;
  }

  submitCounter(payload: { message: string; requestedItems: OfferItem[] }) {
    if (!this.counterTarget) return;

    try {
      this.offerService.counterOffer(this.counterTarget.id, payload.message, payload.requestedItems);
      this.closeCounter();
    } catch (e: any) {
      if (e?.message === 'NO_MONETS') {
        alert('მონეტები არ გაქვს საკმარისი. გთხოვ შეიძინო მონეტები Monet Shop-ში.');
      } else {
        alert('ვერ გაიგზავნა კონტრშეთავაზება');
      }
    }
  }

  // Variant B helper: first counter free
  counterCostText(offer: Offer) {
    const freeLeft = offer.countersUsed < 1;
    return freeLeft ? 'პირველი კონტრი უფასოა' : 'შემდეგი კონტრი ღირს 1 მონეტი';
  }
}