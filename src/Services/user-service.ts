import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<any> {
    return this.http.get("http://localhost:2000/users")
  }

  getDataByID(id: number): Observable<any> {
    return this.http.get(`http://localhost:2000/users/${id}`)

  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:2000/users/${id}`)
  }

  addUser(user: any): Observable<any> {
    return this.http.post("http://localhost:2000/users", user)
  }

  checkEmailExists(email: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<any[]>(`http://localhost:2000/users?email=${email}`).subscribe({
        next: (users) => {
          observer.next(users.length > 0);
          observer.complete();
        },
        error: (error) => {
          console.error('Error checking email existence:', error);
          observer.error(error);
        }
      });
    });
  }
}
