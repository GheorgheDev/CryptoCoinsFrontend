import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Coin } from 'src/app/shared/interfaces/coin.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-table-coins',
  templateUrl: './table-coins.component.html',
  styleUrls: ['./table-coins.component.scss']
})
export class TableCoinsComponent implements OnInit, OnChanges {
  @Input() ee: any;
  dataSource: MatTableDataSource<Coin>;
  displayedColumns: string[] = ['Name', 'Value', 'Image', 'Stock', 'Amount', 'Buy'];

  @Input() loggedUserId: string;
  @Output() onOpenModalBuyCoin = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ee) {
      this.dashboardService.getAllCoinsWithUserCoins(this.loggedUserId)
      .subscribe(coins => {
        this.dataSource = new MatTableDataSource(coins);
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  ngOnInit(): void {
    this.dashboardService.getAllCoinsWithUserCoins(this.loggedUserId)
      .subscribe(coins => {
        this.dataSource = new MatTableDataSource(coins);
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
    this.onOpenModalBuyCoin.emit(coindId)
  }
}