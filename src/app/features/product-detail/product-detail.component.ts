import { Component, NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Item = {
  id: string;
  images: string[];      // <-- multiple images
  title: string;
  condition: string;
  location: string;
  ownerName: string;
  rating: number;
  lookingFor: string;
  description: string;
};

type MyItem = {
  id: string;
  image: string;
  title: string;
};

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  // item you are viewing (from API later)
  item: Item = {
    id: 'item-1',
    images: [
      'assets/images/camera.jpg',
      'assets/images/turntable.jpg',
      'assets/images/mug.jpg',
      'assets/images/vase.jpg',
      'assets/images/camera.jpg',
      'assets/images/turntable.jpg',
      'assets/images/mug.jpg',
      'assets/images/vase.jpg',
    ],
    title: 'Vintage Stilhart Camera',
    condition: 'Like New',
    location: 'Manhattan, NY',
    ownerName: 'Sarah M.',
    rating: 4.8,
    lookingFor: 'electronics',
    description:
      'Clean vintage camera in excellent condition. Lens is clear, body has minimal wear. Includes strap and original case.',
  };

  // gallery state
  selectedImage = this.item.images[0];

  // modal state
  offerOpen = false;

  // your items to offer (from API later)
  myItems: MyItem[] = [
    { id: 'my-1', image: 'assets/images/smartwatch.jpg', title: 'Smart Watch' },
    { id: 'my-2', image: 'assets/images/headphones.jpg', title: 'Headphones' },
    { id: 'my-3', image: 'assets/images/leather-bag.jpg', title: 'Leather Bag' },
    { id: 'my-4', image: 'assets/images/lamp.jpg', title: 'Desk Lamp' },
    { id: 'my-5', image: 'assets/images/smartwatch.jpg', title: 'Smart Watch' },
    { id: 'my-6', image: 'assets/images/headphones.jpg', title: 'Headphones' },
    { id: 'my-7', image: 'assets/images/leather-bag.jpg', title: 'Leather Bag' },
    { id: 'my-8', image: 'assets/images/lamp.jpg', title: 'Desk Lamp' },
  ];

  selectedMyItemId: string | null = null;
  pitch = '';

  get ownerInitial(): string {
    return this.item.ownerName?.charAt(0).toUpperCase() || '?';
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  openOffer() {
    this.offerOpen = true;
  }

  closeOffer() {
    this.offerOpen = false;
  }

  selectMyItem(id: string) {
    this.selectedMyItemId = id;
  }

  sendOffer() {
    if (!this.selectedMyItemId) {
      alert('Please select one of your items first.');
      return;
    }

    const offeredItem = this.myItems.find(x => x.id === this.selectedMyItemId);

    const payload = {
      requestedItemId: this.item.id,
      offeredItemId: this.selectedMyItemId,
      pitch: this.pitch,
      offeredItem,
    };

    console.log('SEND OFFER PAYLOAD:', payload);

    // TODO later: call API
    // this.offersService.sendOffer(payload).subscribe(...)

    this.closeOffer();
    this.pitch = '';
    this.selectedMyItemId = null;
  }
}