import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemFormPageComponent } from '../item-form-page/item-form-page.component';
import { ItemService, InventoryItem, Status } from '../../services/item.service';

@Component({
  selector: 'app-item-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemFormPageComponent],
  templateUrl: './item-list-page.component.html',
  styleUrls: ['./item-list-page.component.css'],
})
export class ItemListPageComponent {
  items: InventoryItem[] = [];

  q = '';
  statusFilter: 'all' | Status = 'all';
  categoryFilter: 'all' | string = 'all';

  // modal state
  formOpen = false;
  editingId: string | null = null;

  constructor(private itemService: ItemService) {
    this.refresh();
  }

  refresh() {
    this.items = this.itemService.getAll();
  }

  get totalListings() {
    return this.items.length;
  }
  get activeCount() {
    return this.items.filter(i => i.status === 'active').length;
  }
  get pendingCount() {
    return this.items.filter(i => i.status === 'pending').length;
  }

  get categories(): string[] {
    const s = new Set(this.items.map(i => i.category));
    return ['all', ...Array.from(s)];
  }

  get filteredItems(): InventoryItem[] {
    const query = this.q.trim().toLowerCase();

    return this.items.filter(i => {
      const matchesQuery =
        !query ||
        i.title.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query) ||
        i.location.toLowerCase().includes(query);

      const matchesStatus = this.statusFilter === 'all' ? true : i.status === this.statusFilter;
      const matchesCategory = this.categoryFilter === 'all' ? true : i.category === this.categoryFilter;

      return matchesQuery && matchesStatus && matchesCategory;
    });
  }

  openAdd() {
    this.editingId = null;
    this.formOpen = true;
  }

  openEdit(item: InventoryItem) {
    this.editingId = item.id;
    this.formOpen = true;
  }

  closeForm() {
    this.formOpen = false;
  }

  onSaved() {
    this.formOpen = false;
    this.refresh();
  }

  deleteItem(id: string) {
    const ok = confirm('Delete this listing?');
    if (!ok) return;
    this.itemService.delete(id);
    this.refresh();
  }

  statusLabel(s: Status) {
    return s === 'active' ? 'Active' : s === 'pending' ? 'pending' : 'Swapped';
  }
}