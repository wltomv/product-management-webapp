import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.apiurl;
  constructor(private httpClient: HttpClient) { }

  generateReport(data: any) {
    return this.httpClient.post(`${this.url}/bill`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getPDF(data: any) {
    return this.httpClient.post(`${this.url}/bill/getPdf`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'blob'
    });
  }
}
