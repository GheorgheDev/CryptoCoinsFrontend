import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../services/dashboard.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { DialogIncreaseWalletComponent } from '../components/dialog-increase-wallet/dialog-increase-wallet.component';
import { DialogBuyCoinComponent } from '../components/dialog-buy-coin/dialog-buy-coin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedUser: User;
  loggedUserId: string;
  ee: any;

  @ViewChild(DialogIncreaseWalletComponent) modalIncreaseWallet: DialogIncreaseWalletComponent;
  @ViewChild(DialogBuyCoinComponent) modalBuyCoin: DialogBuyCoinComponent;
  @ViewChild('loader') loader: ElementRef;
  @ViewChild('dashboard') dashboard: ElementRef;

  constructor(
    private route: Router,
    private dashboardService: DashboardService
  ) {
    setTimeout(() => {
      this.loader.nativeElement.classList.add('loader--close');
      this.dashboard.nativeElement.classList.remove('dashboard--close');
    }, 1500);
  }

  ngOnInit(): void {
    this.loggedUserId = sessionStorage.getItem('userId') || '';
    this.dashboardService.getUserById(this.loggedUserId)
      .subscribe(user => this.loggedUser = user);
  }

  updateUserWallet(newUserWallet: number) {
    this.loggedUser.wallet = newUserWallet;
  }

  update(ee: any) {
    this.loggedUser.wallet = ee.walletUpdated;
    this.ee = ee;
    console.log(ee);
  }

  openModalIncreaseWallet() {
    this.modalIncreaseWallet.openModalIncreaseWallet();
  }

  openModalBuyCoin(event: string) {
    this.modalBuyCoin.openModalIncreaseWallet(event);
  }

  logout(): void {
    sessionStorage.removeItem('userId');
    this.route.navigate(['login']);
  }
}