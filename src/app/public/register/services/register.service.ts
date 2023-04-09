import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private http: HttpClient
  ) { }

  registerUser(newUser: User): Observable<string> {
    return this.http.post<string>('/api/users/create', { newUser });
  }
}
