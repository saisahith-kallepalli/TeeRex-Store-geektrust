import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData = (url: string) => {
    return this.http.get(url);
  };
  // postMethod = (url: string, body?: any) => {
  //   return this.http.post(url, body, {
  //     headers: { Accept: 'application/json' },
  //   });
  // };
}
