import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'countered' | 'cancelled';

export interface OfferItem {
  id: string;
  title: string;
  image: string;
  condition: string;
  value: number;
}

export interface Offer {
  id: string;
  threadId: string; // ერთი "მოლაპარაკების" იდენტიფიკატორი
  direction: 'received' | 'sent'; // შენი მხრიდან: შემოსული თუ გაგზავნილი

  fromUser: { name: string; username: string };
  toUser: { name: string; username: string };

  toItem: OfferItem;          // ვის ნივთზეა შეთავაზება (requested)
  offeredItems: OfferItem[];  // რას სთავაზობ

  message?: string;
  createdAt: string;
  status: OfferStatus;

  // Variant B: 1 free counter per thread
  countersUsed: number; // ამ thread-ში რამდენი counter გაიგზავნა (შენგან)
  monetSpent: number;   // ჯამში რამდენი მონეტი დაიხარჯა ამ offer/thread-ზე (შენგან)
}

@Injectable({ providedIn: 'root' })
export class OfferService {
  // demo balance (later: real from backend)
  private _monets$ = new BehaviorSubject<number>(7);
  monets$ = this._monets$.asObservable();

  private _offers$ = new BehaviorSubject<Offer[]>([
    // RECEIVED
    {
      id: 'of1',
      threadId: 'th1',
      direction: 'received',
      fromUser: { name: 'Gio T.', username: 'gio' },
      toUser: { name: 'You', username: 'me' },
      toItem: { id: 'my1', title: 'Vintage Stilhart Camera', image: 'assets/images/camera.jpg', condition: 'Like New', value: 300 },
      offeredItems: [
        { id: 'o1', title: 'Smart Switch Headphones', image: 'assets/images/headphones.jpg', condition: 'New', value: 280 },
        { id: 'o2', title: 'Handmade Ceramic Mug', image: 'assets/images/mug.jpg', condition: 'New', value: 35 },
      ],
      message: 'გამარჯობა, მზად ვარ გაცვლაზე 🙂',
      createdAt: new Date().toISOString(),
      status: 'pending',
      countersUsed: 0,
      monetSpent: 0,
    },

    // SENT (შენ გაგზავნილი)
    {
      id: 'of2',
      threadId: 'th2',
      direction: 'sent',
      fromUser: { name: 'You', username: 'me' },
      toUser: { name: 'Anna K.', username: 'anna' },
      toItem: { id: 'x1', title: 'Blue Pattern Vase', image: 'assets/images/vase.jpg', condition: 'New', value: 85 },
      offeredItems: [
        { id: 'm3', title: 'Vintage Leather Messenger', image: 'assets/images/leather-bag.jpg', condition: 'Good', value: 120 },
      ],
      message: 'ვცვლი ჩანთაზე, თუ გინდა 😊',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      status: 'pending',
      countersUsed: 0,
      monetSpent: 1, // მაგალითად ამ offer-ის გაგზავნაზე უკვე დაიხარჯა 1 monet
    },
  ]);

  offers$ = this._offers$.asObservable();

  getMonetsSnapshot() {
    return this._monets$.getValue();
  }

  private setMonets(value: number) {
    this._monets$.next(Math.max(0, value));
  }

  // --- Actions ---
  acceptOffer(id: string) {
    this.patch(id, { status: 'accepted' });
  }

  declineOffer(id: string) {
    this.patch(id, { status: 'declined' });
  }

  cancelOffer(id: string) {
    this.patch(id, { status: 'cancelled' });
  }

  /**
   * Variant B:
   * - 1st counter per thread is FREE
   * - next counters cost 1 Monet (deduct from balance on submit)
   */
  counterOffer(id: string, message: string, newOfferedItems: OfferItem[]) {
    const offers = this._offers$.getValue();
    const target = offers.find(o => o.id === id);
    if (!target) return;

    // Only allow counter while pending
    if (target.status !== 'pending') return;

    const isFree = target.countersUsed < 1;
    const cost = isFree ? 0 : 1;

    const currentMonets = this.getMonetsSnapshot();
    if (cost > 0 && currentMonets < cost) {
      // no enough monets
      throw new Error('NO_MONETS');
    }

    // deduct
    if (cost > 0) {
      this.setMonets(currentMonets - cost);
    }

    this.patch(id, {
      status: 'countered',
      message: message?.trim() ? message.trim() : target.message,
      offeredItems: newOfferedItems.length ? newOfferedItems : target.offeredItems,
      countersUsed: target.countersUsed + 1,
      monetSpent: target.monetSpent + cost,
    });
  }

  // helper to update one offer
  private patch(id: string, partial: Partial<Offer>) {
    const offers = this._offers$.getValue().map(o => (o.id === id ? { ...o, ...partial } : o));
    this._offers$.next(offers);
  }
}