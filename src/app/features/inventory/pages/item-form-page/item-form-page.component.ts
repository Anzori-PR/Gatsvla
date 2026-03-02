import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ItemService, InventoryItem, Status } from '../../services/item.service';

@Component({
  selector: 'app-item-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form-page.component.html',
  styleUrls: ['./item-form-page.component.css'],
})
export class ItemFormPageComponent {
  @Input() editingId: string | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form = this.emptyForm();

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    if (this.editingId) {
      const item = this.itemService.getById(this.editingId);
      if (item) {
        this.form = {
          title: item.title,
          description: item.description,
          category: item.category,
          condition: item.condition,
          value: item.value,
          location: item.location,
          status: item.status,
          images: [...item.images],
        };
      }
    }
  }

  private emptyForm() {
    return {
      title: '',
      description: '',
      category: 'Electronics',
      condition: 'Good',
      value: 0,
      location: '',
      status: 'active' as Status,
      images: [] as string[],
    };
  }

  closeModal() {
    this.close.emit();
  }

  async onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);
    const max = 8;
    const allowed = files.slice(0, Math.max(0, max - this.form.images.length));

    for (const file of allowed) {
      const dataUrl = await this.itemService.fileToDataUrl(file);
      this.form.images.push(dataUrl);
    }
    input.value = '';
  }

  removeImage(i: number) {
    this.form.images.splice(i, 1);
  }

  setCover(i: number) {
    const img = this.form.images.splice(i, 1)[0];
    this.form.images.unshift(img);
  }

  save(f: NgForm) {
    if (!f.valid) return;
    if (this.form.images.length === 0) {
      alert('Please add at least 1 image.');
      return;
    }

    const payload: Omit<InventoryItem, 'id'> = {
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      category: this.form.category,
      condition: this.form.condition,
      value: Number(this.form.value) || 0,
      location: this.form.location.trim(),
      status: this.form.status,
      images: [...this.form.images],
    };

    if (this.editingId) {
      this.itemService.update(this.editingId, payload);
    } else {
      this.itemService.create(payload);
    }

    this.saved.emit();
  }
}