import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { ItemCardComponent } from '../../../../shared/components/item-card/item-card.component';

type Item = {
  id: string;
  image: string;
  title: string;
  condition: string;
  location: string;
  ownerName: string;
  rating: number;
  lookingFor: string;
  category: string;
  value?: number;
  description?: string;
};

@Component({
  selector: 'app-browse-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterSidebarComponent, ItemCardComponent],
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.css'],
})
export class BrowsePageComponent {
  search = '';
  sort = 'newest'; // newest | oldest
  view: 'grid' | 'list' = 'grid';

  // show more
  pageSize = 6;
  visibleCount = this.pageSize;

  filters = { category: null as string | null, condition: null as string | null, valueMax: 500 };

  items: Item[] = [
    {
      id:'1', image:'assets/images/camera.jpg',
      title:'Vintage Stilhart Camera', condition:'Like New',
      location:'Manhattan, NY', ownerName:'Sarah M.', rating:4.8,
      lookingFor:'electronics', category:'electronics', value:300,
      description:'ლამაზი ვინტაჟური კამერა მუშა მდგომარეობაში'
    },
    {
      id:'2', image:'assets/images/headphones.jpg',
      title:'Smart Switch Headphones', condition:'New',
      location:'Queens, NY', ownerName:'Mike R.', rating:4.8,
      lookingFor:'electronics', category:'electronics', value:280,
      description:'პრემიუმ noise-cancelling ყურსასმენები'
    },
    {
      id:'3', image:'assets/images/smartwatch.jpg',
      title:'Smart Watch Pro', condition:'Like New',
      location:'Bronx, NY', ownerName:'Alex K.', rating:4.8,
      lookingFor:'electronics', category:'electronics', value:350,
      description:'ჯანმრთელობის tracking-ით'
    },
    {
      id:'4', image:'assets/images/vase.jpg',
      title:'Blue Pattern Vase', condition:'New',
      location:'Brooklyn, NY', ownerName:'Anna K.', rating:4.6,
      lookingFor:'home decor', category:'furniture', value:85,
      description:'დეკორისთვის იდეალური'
    },
    {
      id:'5', image:'assets/images/mug.jpg',
      title:'Handmade Ceramic Mug', condition:'New',
      location:'Queens, NY', ownerName:'Nika G.', rating:4.7,
      lookingFor:'home decor', category:'books', value:35,
      description:'ხელნაკეთი კერამიკული ჭიქა'
    },
    {
      id:'6', image:'assets/images/leather-bag.jpg',
      title:'Vintage Leather Messenger', condition:'Good',
      location:'Manhattan, NY', ownerName:'Dato K.', rating:4.5,
      lookingFor:'clothing', category:'clothing', value:120,
      description:'ვინტაჟური ტყავის ჩანთა'
    },
    { id:'7', image:'assets/images/lamp.jpg', title:'Modern Desk Lamp', condition:'Good', location:'Brooklyn, NY', ownerName:'Lika S.', rating:4.6, lookingFor:'home decor', category:'furniture', value:60, description:'მოდერნული ნათურა' },
    { id:'8', image:'assets/images/turntable.jpg', title:'Vinyl Turntable', condition:'Fair', location:'Tbilisi, GE', ownerName:'Gio T.', rating:4.4, lookingFor:'electronics', category:'electronics', value:220, description:'ვინილის ფლეიერი' },
  ];

  // reset visible count when filters/search changes
  private resetVisible() {
    this.visibleCount = this.pageSize;
  }

  onFiltersChange(f: any) {
    this.filters = f;
    this.resetVisible();
  }

  onSearchChange() {
    this.resetVisible();
  }

  setView(v: 'grid' | 'list') {
    this.view = v;
  }

  loadMore() {
    this.visibleCount = Math.min(this.visibleCount + this.pageSize, this.filteredItems.length);
  }

  showLess() {
    this.visibleCount = this.pageSize;
  }

  get filteredItems() {
    const q = this.search.trim().toLowerCase();

    let res = this.items.filter(i => {
      const matchesSearch =
        !q ||
        i.title.toLowerCase().includes(q) ||
        (i.description ?? '').toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.lookingFor.toLowerCase().includes(q);

      const matchesCategory = !this.filters.category || i.category === this.filters.category;
      const matchesCondition = !this.filters.condition || i.condition === this.filters.condition;
      const matchesValue = (i.value ?? 0) <= (this.filters.valueMax ?? 500);

      return matchesSearch && matchesCategory && matchesCondition && matchesValue;
    });

    res = [...res].sort((a, b) => {
      if (this.sort === 'oldest') return a.id.localeCompare(b.id);
      return b.id.localeCompare(a.id);
    });

    return res;
  }

  get visibleItems() {
    return this.filteredItems.slice(0, this.visibleCount);
  }

  get canLoadMore() {
    return this.visibleCount < this.filteredItems.length;
  }

  makeOffer(item: Item) {
    // აქ მერე გააკეთებ მოდალის გახსნას ან navigation-ს
    console.log('Make offer:', item);
    alert(`შეთავაზების გაგზავნა: ${item.title}`);
  }

  // პატარა დამხმარე ავატარისთვის
  ownerInitial(name: string) {
    return (name?.trim()?.[0] ?? '?').toUpperCase();
  }
}