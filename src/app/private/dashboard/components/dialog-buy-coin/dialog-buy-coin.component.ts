import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './../../services/dashboard.service';
import { Coin } from 'src/app/shared/interfaces/coin.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-dialog-buy-coin',
  templateUrl: './dialog-buy-coin.component.html',
  styleUrls: ['./dialog-buy-coin.component.scss']
})
export class DialogBuyCoinComponent implements OnInit {
  coin: Coin;
  submitted: boolean = false;
  formBuyCoin: FormGroup;
  showErrorNotEnoughMoney: boolean = false;
  showErrorHigherAmount: boolean = false;

  @Input() loggedUser: User;
  @Output() onUpdate = new EventEmitter<any>();

  @ViewChild('modalBuyCoin') modalBuyCoin: ElementRef;
  @ViewChild('background') backround: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.formBuyCoin = this.formBuilder.group({
      amount: ['', [Validators.required]]
    })
  }

  openModalIncreaseWallet(coindId: string) {
    this.getCoinById(coindId);
    this.backround.nativeElement.classList.remove('background--close');
    this.modalBuyCoin.nativeElement.setAttribute('open', '');
  }

  getCoinById(coinId: string): void {
    this.dashboardService.getCoinById(coinId)
      .subscribe(coin => {
        this.coin = coin;
      })
  }

  closeModalBuyCoin() {
    this.backround.nativeElement.classList.add('background--close');
    this.modalBuyCoin.nativeElement.removeAttribute('open');
    this.submitted = false;
    this.formBuyCoin.reset();
  }

  checkInputValue(): boolean {
    const userWallet = this.loggedUser.wallet;
    const coinValue = this.coin.value;
    const amount: number = this.formBuyCoin.get('amount')?.value;

    if (userWallet < coinValue || userWallet < (coinValue * amount)) {
      this.showErrorNotEnoughMoney = true;
      return false;
    }

    if (amount > this.coin.stock) {
      this.showErrorHigherAmount = true;
      return false;
    }

    this.showErrorNotEnoughMoney = false;
    this.showErrorHigherAmount = false;

    return true;
  }

  buyCoins() {
    this.submitted = true;
    const userWallet = this.loggedUser.wallet;
    const coinValue = this.coin.value;
    const amount: number = this.formBuyCoin.get('amount')?.value;
    let walletTotal = 0;
    let stockTotal = 0;

    if (this.formBuyCoin.valid && this.checkInputValue()) {
      this.showErrorNotEnoughMoney = false;
      this.showErrorHigherAmount = false;

      walletTotal = userWallet - (coinValue * amount);
      stockTotal = this.coin.stock - amount;

      this.dashboardService.buyCoins({
        user_id: this.loggedUser.user_id,
        coin_id: this.coin.coin_id,
        amount: amount,
        wallet: walletTotal,
        stock: stockTotal
      })
        .subscribe((result) => {
          this.onUpdate.emit(result);
          this.closeModalBuyCoin();
        })
    }
  }
}