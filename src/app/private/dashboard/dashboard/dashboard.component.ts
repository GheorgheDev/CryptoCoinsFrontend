import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../services/dashboard.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { DialogIncreaseWalletComponent } from '../components/dialog-increase-wallet/dialog-increase-wallet.component';
import { DialogBuyCoinComponent } from '../components/dialog-buy-coin/dialog-buy-coin.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { DialogSellCoinComponent } from '../components/dialog-sell-coin/dialog-sell-coin.component';
import { DatasetSellButton } from 'src/app/shared/interfaces/datasetSellButton.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedUser: User;
  loggedUserId: string;
  walletUpdated: number;

  @ViewChild(DialogIncreaseWalletComponent) modalIncreaseWallet: DialogIncreaseWalletComponent;
  @ViewChild(DialogBuyCoinComponent) modalBuyCoin: DialogBuyCoinComponent;
  @ViewChild(DialogSellCoinComponent) modalSellCoin: DialogSellCoinComponent;
  @ViewChild(SpinnerComponent) spinner: SpinnerComponent;
  @ViewChild('dashboard') dashboard: ElementRef;

  constructor(
    private route: Router,
    private dashboardService: DashboardService
  ) {
    setTimeout(() => {
      this.spinner.closeSpinner();
      this.dashboard.nativeElement.classList.remove('dashboard--close');
    }, 1500);
  }

  ngOnInit(): void {
    this.loggedUserId = sessionStorage.getItem('userId') || '';
    this.dashboardService.getUserById(this.loggedUserId)
      .subscribe(user => this.loggedUser = user);
  }

  updateUserWallet(walletUpdated: number) {
    this.loggedUser.wallet = walletUpdated;
    this.walletUpdated = walletUpdated;
  }

  openModalIncreaseWallet() {
    this.modalIncreaseWallet.openModalIncreaseWallet();
  }

  openModalBuyCoin(coinId: string) {
    this.modalBuyCoin.openModalBuyCoin(coinId);
  }

  openModalSellCoin(datasetSellButton: DatasetSellButton) {
    this.modalSellCoin.openModalSellCoin(datasetSellButton);
  }

  logout(): void {
    sessionStorage.removeItem('userId');
    this.route.navigate(['login']);
  }
}