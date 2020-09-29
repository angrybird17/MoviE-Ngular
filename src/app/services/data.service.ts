import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:5000";
  // url = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  user() {
    return this.http.post(this.url, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  getData() {
    return this.http.get(`${this.url}/data`);
  }
  createBooking(body) {
    return this.http.post(`${this.url}/booking`, JSON.parse(body));
  }

  getSeats() {
    return this.http.get(`${this.url}/seatLabel`);
  }

  getDbData() {
    return this.http.get(`${this.url}/seatCount`);
  }
}