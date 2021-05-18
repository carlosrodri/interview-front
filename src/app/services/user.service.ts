import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  endPoint = 'http://localhost:3000/api/'

  getFromInternet() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  list() {
    return this.http.get(this.endPoint);
  }

  update(id: number, body: {}) {
    return this.http.put(this.endPoint + id, body)
  }

  add(body: {}) {
    return this.http.post(this.endPoint, body)
  }

  delete(id: number) {
    return this.http.delete(this.endPoint + id)
  }
}
