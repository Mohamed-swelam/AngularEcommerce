import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:2000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDataByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  checkEmailExists(email: string): Observable<boolean> {

    return new Observable((observer) => {

      this.http
        .get<any[]>(`${this.apiUrl}?email=${email}`)
        .subscribe({

          next: (users) => {

            observer.next(users.length > 0);
            observer.complete();
          },

          error: (err) => {

            observer.error(err);
          }
        });
    });
  }
}
