import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogIncreaseWalletComponent } from './components/dialog-increase-wallet/dialog-increase-wallet.component';
import { DialogBuyCoinComponent } from './components/dialog-buy-coin/dialog-buy-coin.component';
import { TableCoinsComponent } from './components/table-coins/table-coins.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DialogSellCoinComponent } from './components/dialog-sell-coin/dialog-sell-coin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DialogIncreaseWalletComponent,
    DialogBuyCoinComponent,
    TableCoinsComponent,
    SpinnerComponent,
    DialogSellCoinComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
