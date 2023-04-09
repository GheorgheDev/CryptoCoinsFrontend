import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient
  ) { }

  checkUserExist(email: string, password: string): Observable<User> {
    return this.http.get<User>(`/api/users/get/user/${email}/${password}`);
  }
}