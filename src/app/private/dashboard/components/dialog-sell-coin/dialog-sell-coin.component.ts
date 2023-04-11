import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './../../services/dashboard.service';
import { Coin } from 'src/app/shared/interfaces/coin.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { DatasetSellButton } from 'src/app/shared/interfaces/datasetSellButton.interface';

@Component({
  selector: 'app-dialog-sell-coin',
  templateUrl: './dialog-sell-coin.component.html',
  styleUrls: ['./dialog-sell-coin.component.scss']
})
export class DialogSellCoinComponent implements OnInit {
  coin: Coin;
  submitted: boolean = false;
  formSellCoin: FormGroup;
  showErrorHigherAmount: boolean = false;
  amount: string;

  @Input() loggedUser: User;

  @Output() onUpdate = new EventEmitter<number>();

  @ViewChild('modalSellCoin') modalSellCoin: ElementRef;
  @ViewChild('background') backround: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.formSellCoin = this.formBuilder.group({
      amount: ['', [Validators.required]]
    })
  }

  openModalSellCoin(datasetSellButton: DatasetSellButton) {
    const { coin_id, amount } = datasetSellButton;

    this.amount = amount;
    this.getCoinById(coin_id); // Problemas de rendimiento
    this.backround.nativeElement.classList.remove('background--close');
    this.modalSellCoin.nativeElement.setAttribute('open', '');
  }

  getCoinById(coinId: string): void {
    this.dashboardService.getCoinById(coinId)
      .subscribe(coin => {
        this.coin = coin;
      })
  }

  closeModalSellCoin() {
    this.backround.nativeElement.classList.add('background--close');
    this.modalSellCoin.nativeElement.removeAttribute('open');
    this.submitted = false;
    this.formSellCoin.reset();
  }

  checkInputValue(): boolean {
    const amount: number = this.formSellCoin.get('amount')?.value;

    if (amount > parseInt(this.amount)) {
      this.showErrorHigherAmount = true;
      return false;
    }

    this.showErrorHigherAmount = false;

    return true;
  }

  sellCoins() {
    this.submitted = true;
    const userWallet: number = this.loggedUser.wallet;
    const coinValue: number = this.coin.value;
    const amount: number = this.formSellCoin.get('amount')?.value;
    const coinStock: number = +this.coin.stock;
    let walletUpdated = 0;
    let stockUpdated = 0;

    if (this.formSellCoin.valid && this.checkInputValue()) {
      this.showErrorHigherAmount = false;

      walletUpdated = userWallet + (coinValue * amount);
      stockUpdated = coinStock + amount;

      this.dashboardService.sellCoins({
        user_id: this.loggedUser.user_id || '',
        coin_id: this.coin.coin_id,
        amount: amount,
        wallet: walletUpdated,
        stock: stockUpdated
      })
        .subscribe((walletUpdated: number) => {
          this.onUpdate.emit(walletUpdated);
          this.closeModalSellCoin();
        })
    }
  }
}