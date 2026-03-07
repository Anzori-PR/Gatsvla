import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // HOME
      { path: '', component: DashboardComponent },

      // MAIN PAGES
      {
        path: 'browse',
        loadComponent: () =>
          import('./features/browse/pages/browse-page/browse-page.component')
            .then(m => m.BrowsePageComponent),
      },
      {
        path: 'item/:id', loadComponent: () =>
          import('./features/product-detail/product-detail.component')
            .then(m => m.ProductDetailComponent),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./features/inventory/pages/item-list-page/item-list-page.component')
            .then(m => m.ItemListPageComponent),
      },
      {
        path: 'inventory/new',
        loadComponent: () =>
          import('./features/inventory/pages/item-form-page/item-form-page.component')
            .then(m => m.ItemFormPageComponent),
      },
      {
        path: 'inventory/edit/:id',
        loadComponent: () =>
          import('./features/inventory/pages/item-form-page/item-form-page.component')
            .then(m => m.ItemFormPageComponent),
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./features/offers/pages/offers-page/offers-page.component')
            .then(m => m.OffersPageComponent),
      },
      {
        path: 'messages',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/messaging/pages/messages-page/messages-page.component')
            .then(m => m.MessagesPageComponent),
      },
      {
        path: 'profile/:username',
        loadComponent: () =>
          import('./features/profile/pages/user-profile/user-profile.component')
            .then(m => m.UserProfileComponent),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./features/profile/pages/edit-profile/edit-profile.component')
            .then(m => m.EditProfileComponent),
      },
      {
        path: 'monet-shop',
        loadComponent: () =>
          import('./features/monet-shop/pages/shop-page/shop-page.component')
            .then(m => m.ShopPageComponent),
      },

      // FALLBACK
      { path: '**', redirectTo: '' },
    ],
  },
];
