import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from "../../../shared/components/item-card/item-card.component";
import { NgFor } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ItemCardComponent, FormsModule, NgFor, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
items = [
  {
    image: 'assets/images/camera.jpg',
    title: 'Vintage Stilhart Camera',
    condition: 'Like New',
    location: 'Manhattan, NY',
    ownerName: 'Sarah M.',
    rating: 4.8,
    lookingFor: 'electronics'
  },
  {
    image: 'assets/images/headphones.jpg',
    title: 'Smart Switch Headphones',
    condition: 'New',
    location: 'Queens, NY',
    ownerName: 'Mike R.',
    rating: 4.8,
    lookingFor: 'electronics'
  },
  {
    image: 'assets/images/lamp.jpg',
    title: 'Modern Desk Lamp',
    condition: 'Good',
    location: 'Brooklyn, NY',
    ownerName: 'Anna K.',
    rating: 4.6,
    lookingFor: 'home decor'
  },
  {
    image: 'assets/images/leather-bag.jpg',
    title: 'Leather Travel Bag',
    condition: 'Like New',
    location: 'Austin, TX',
    ownerName: 'David P.',
    rating: 4.7,
    lookingFor: 'fashion'
  },
  {
    image: 'assets/images/mug.jpg',
    title: 'Handmade Ceramic Mug',
    condition: 'New',
    location: 'Denver, CO',
    ownerName: 'Emily R.',
    rating: 4.9,
    lookingFor: 'home goods'
  },
  {
    image: 'assets/images/smartwatch.jpg',
    title: 'Smart Watch',
    condition: 'Like New',
    location: 'San Jose, CA',
    ownerName: 'Tom R.',
    rating: 4.7,
    lookingFor: 'electronics'
  },
  {
    image: 'assets/images/turntable.jpg',
    title: 'Vintage Turntable',
    condition: 'Good',
    location: 'Portland, OR',
    ownerName: 'Chris L.',
    rating: 4.6,
    lookingFor: 'audio gear'
  },
  {
    image: 'assets/images/vase.jpg',
    title: 'Decorative Clay Vase',
    condition: 'Like New',
    location: 'Santa Monica, CA',
    ownerName: 'Laura S.',
    rating: 4.8,
    lookingFor: 'home decor'
  }
];


}
