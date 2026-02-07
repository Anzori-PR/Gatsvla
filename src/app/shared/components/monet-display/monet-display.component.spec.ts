import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetDisplayComponent } from './monet-display.component';

describe('MonetDisplayComponent', () => {
  let component: MonetDisplayComponent;
  let fixture: ComponentFixture<MonetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
