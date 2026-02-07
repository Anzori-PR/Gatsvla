import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormPageComponent } from './item-form-page.component';

describe('ItemFormPageComponent', () => {
  let component: ItemFormPageComponent;
  let fixture: ComponentFixture<ItemFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
