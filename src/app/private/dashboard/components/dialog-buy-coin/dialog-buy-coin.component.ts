import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './../../services/dashboard.service';
import { Coin } from 'src/app/shared/interfaces/coin.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { DatasetSellButton } from 'src/app/shared/interfaces/datasetSellButton.interface';

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
  amount: string;

  @Input() loggedUser: User;

  @Output() onUpdate = new EventEmitter<number>();

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

  openModalBuyCoin(datasetSellButton: DatasetSellButton) {
    const { coin_id, amount } = datasetSellButton;

    this.amount = amount;
    this.getCoinById(coin_id); // Problemas de rendimiento
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
    const userWallet: number = this.loggedUser.wallet;
    const coinValue: number = this.coin.value;
    const amount: number = this.formBuyCoin.get('amount')?.value;
    const coinStock: number = this.coin.stock;

    if (userWallet < coinValue || userWallet < (coinValue * amount)) {
      this.showErrorNotEnoughMoney = true;
      return false;
    }

    if (amount > coinStock) {
      this.showErrorHigherAmount = true;
      return false;
    }

    this.showErrorNotEnoughMoney = false;
    this.showErrorHigherAmount = false;

    return true;
  }

  buyCoins() {
    this.submitted = true;
    const userWallet: number = this.loggedUser.wallet;
    const coinValue: number = this.coin.value;
    const amount: number = this.formBuyCoin.get('amount')?.value;
    const coinStock: number = this.coin.stock;
    let walletUpdated = 0;
    let stockUpdated = 0;

    if (this.formBuyCoin.valid && this.checkInputValue()) {
      this.showErrorNotEnoughMoney = false;
      this.showErrorHigherAmount = false;

      walletUpdated = userWallet - (coinValue * amount);
      stockUpdated = coinStock - amount;

      this.dashboardService.buyCoins({
        user_id: this.loggedUser.user_id || '',
        coin_id: this.coin.coin_id,
        amount: amount,
        wallet: walletUpdated,
        stock: stockUpdated
      })
        .subscribe((walletUpdated: number) => {
          this.onUpdate.emit(walletUpdated);
          this.closeModalBuyCoin();
        })
    }
  }
}