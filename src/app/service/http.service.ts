import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@Angular/common/http';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' }) };
  api = 'http://127.0.0.1:8080/';

  axiosGet(suffix: string) {
    return new Promise((resolve, reject) => {
      axios.get(this.api + suffix)
        // tslint:disable-next-line: only-arrow-functions
        .then(function (response) {
          resolve(response);
        });
    });
  }
  axiosPost(suffix: string, data: any) {
    return new Promise((resolve, reject) => {
      axios.post(this.api + suffix, data)
        // tslint:disable-next-line: only-arrow-functions
        .then(function (response) {
          resolve(response);
        });
    });
  }

  post(suffix: string, data: any) {
    return new Promise((resovle, reject) => {
      this.http.post(this.api + suffix, data, this.httpOptions).subscribe((response: any) => {
        resovle(response);
      });
    });
  }
}
