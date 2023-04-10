import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuyCoinComponent } from './dialog-buy-coin.component';

describe('DialogBuyCoinComponent', () => {
  let component: DialogBuyCoinComponent;
  let fixture: ComponentFixture<DialogBuyCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBuyCoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBuyCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
