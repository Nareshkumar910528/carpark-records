import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparkListingsComponent } from './carpark-listings.component';

describe('CarparkListingsComponent', () => {
  let component: CarparkListingsComponent;
  let fixture: ComponentFixture<CarparkListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarparkListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarparkListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
