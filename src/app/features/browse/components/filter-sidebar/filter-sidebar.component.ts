import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Category = { key: string; label: string; icon: string; };

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css'],
})
export class FilterSidebarComponent {
  @Output() filtersChange = new EventEmitter<any>();

  categories: Category[] = [
    { key: 'electronics', label: 'Electronics', icon: '📱' },
    { key: 'furniture', label: 'Furniture', icon: '🪑' },
    { key: 'clothing', label: 'Clothing', icon: '👕' },
    { key: 'collectibles', label: 'Collectibles', icon: '🏆' },
    { key: 'books', label: 'Books', icon: '📚' },
  ];

  conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  // state
  selectedCategory: string | null = null;
  selectedCondition: string | null = null;
  valueMax = 500;

  showAllCategories = false;

  emit() {
    this.filtersChange.emit({
      category: this.selectedCategory,
      condition: this.selectedCondition,
      valueMax: this.valueMax,
    });
  }

  pickCategory(key: string) {
    this.selectedCategory = this.selectedCategory === key ? null : key;
    this.emit();
  }

  pickCondition(c: string) {
    this.selectedCondition = this.selectedCondition === c ? null : c;
    this.emit();
  }

  onValueChange() {
    this.emit();
  }

  toggleShowAll() {
    this.showAllCategories = !this.showAllCategories;
  }
}