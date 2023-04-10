import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIncreaseWalletComponent } from './dialog-increase-wallet.component';

describe('DialogIncreaseWalletComponent', () => {
  let component: DialogIncreaseWalletComponent;
  let fixture: ComponentFixture<DialogIncreaseWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogIncreaseWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIncreaseWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
