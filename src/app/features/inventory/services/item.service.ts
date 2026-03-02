import { Injectable } from '@angular/core';

export type Status = 'active' | 'pending' | 'swapped';

export type InventoryItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  value: number;
  location: string;
  status: Status;
  images: string[]; // urls or dataUrls
};

@Injectable({ providedIn: 'root' })
export class ItemService {
  private items: InventoryItem[] = [
    {
      id: '1',
      title: 'Film 35mm Canon AE-1',
      description: 'Classic 35mm film camera in excellent condition',
      category: 'Electronics',
      condition: 'Good',
      value: 250,
      location: 'Manhattan, NY',
      status: 'active',
      images: ['assets/images/camera.jpg'],
    },
    {
      id: '2',
      title: 'Handmade Ceramic Set',
      description: 'Set of 4 artisan ceramic mugs',
      category: 'Home & Garden',
      condition: 'New',
      value: 85,
      location: 'Brooklyn, NY',
      status: 'active',
      images: ['assets/images/mug.jpg'],
    },
    {
      id: '3',
      title: 'Vintage Leather Messenger',
      description: 'Distressed leather messenger bag',
      category: 'Fashion',
      condition: 'Good',
      value: 120,
      location: 'Queens, NY',
      status: 'pending',
      images: ['assets/images/leather-bag.jpg'],
    },
  ];

  getAll(): InventoryItem[] {
    return [...this.items];
  }

  getById(id: string): InventoryItem | undefined {
    return this.items.find(i => i.id === id);
  }

  create(payload: Omit<InventoryItem, 'id'>): InventoryItem {
    const id = crypto?.randomUUID?.() ?? String(Date.now());
    const item: InventoryItem = { id, ...payload };
    this.items.unshift(item);
    return item;
  }

  update(id: string, payload: Omit<InventoryItem, 'id'>): InventoryItem | undefined {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return undefined;
    const updated: InventoryItem = { id, ...payload };
    this.items[idx] = updated;
    return updated;
  }

  delete(id: string) {
    this.items = this.items.filter(i => i.id !== id);
  }

  // helper for file -> dataUrl (for upload preview without backend)
  fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}