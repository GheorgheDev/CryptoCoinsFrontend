import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/interfaces/user.interface';
import { Coin } from 'src/app/shared/interfaces/coin.interface';
import { Sale } from 'src/app/shared/interfaces/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private http: HttpClient
  ) { }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`/api/users/get/user/${userId}`);
  }

  increaseWallet(user: User, wallet: number): Observable<number> {
    return this.http.patch<number>('/api/users/increase-wallet', { user, wallet });
  }

  getAllCoinsWithUserCoins(userId: string): Observable<Coin[]> {
    return this.http.get<Coin[]>(`/api/coins/get/all/${userId}`);
  }

  getCoinById(coinId: string): Observable<Coin> {
    return this.http.get<Coin>(`/api/coins/get/${coinId}`);
  }

  buyCoins(buy: Sale): Observable<number> {
    return this.http.post<number>('/api/user-coins/add', { newUserCoins: buy });
  }

  sellCoins(buy: Sale): Observable<number> {
    return this.http.post<number>('/api/user-coins/delete', { userCoins: buy });
  }
}