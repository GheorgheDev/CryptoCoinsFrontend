import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DashboardService } from '../../services/dashboard.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { DatasetSellButton } from 'src/app/shared/interfaces/datasetSellButton.interface';
import { Coin } from 'src/app/shared/interfaces/coin.interface';
import { UserCoins } from 'src/app/shared/interfaces/userCoins.interface';

@Component({
  selector: 'app-table-coins',
  templateUrl: './table-coins.component.html',
  styleUrls: ['./table-coins.component.scss']
})
export class TableCoinsComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<Coin>;
  displayedColumns: string[] = ['Image', 'Name', 'Value', 'Stock', 'Amount', 'Buy', 'Sell'];

  @Input() walletUpdated: number;
  @Input() loggedUser: User;
  @Input() loggedUserId: string;

  @Output() onOpenModalBuyCoin = new EventEmitter<DatasetSellButton>();
  @Output() onOpenModalSellCoin = new EventEmitter<DatasetSellButton>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnChanges(_changes: SimpleChanges) {
    this.dashboardService.getAllUserCoins(this.loggedUserId)
      .subscribe(result => {
        this.getAllCoinsWithAmount(result);
      })
  }

  ngOnInit(): void {
    this.dashboardService.getAllUserCoins(this.loggedUserId)
      .subscribe(listUserCoins => {
        this.getAllCoinsWithAmount(listUserCoins);
      })
  }

  getAllCoinsWithAmount(listUserCoins: UserCoins[]) {
    this.dashboardService.getAllCoins()
      .subscribe(coins => {
        const allCoinsWithAmount: Coin[] = coins.map((coin) => {
          const userCoin = listUserCoins.find((coinUser: UserCoins) => coinUser.coin_id === coin.coin_id);
          userCoin ? coin["amount"] = userCoin.amount : coin["amount"] = 0;
          return coin;
        });

        this.dataSource = new MatTableDataSource(allCoinsWithAmount);
        this.dataSource.paginator = this.paginator;
      })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalBuyCoin(event: Event) {
    const coindId = (event.target as HTMLButtonElement).dataset.coinid as string;
    const amount = (event.target as HTMLButtonElement).dataset.amount as string;
    this.onOpenModalBuyCoin.emit(
      {
        coin_id: coindId,
        amount: amount
      }
    );
  }

  openModalSellCoin(event: Event) {
    const coindId = (event.target as HTMLButtonElement).dataset.coinid as string;
    const amount = (event.target as HTMLButtonElement).dataset.amount as string;
    this.onOpenModalSellCoin.emit({
      coin_id: coindId,
      amount: amount
    });
  }
}