import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiurl;

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get(`${this.url}/product`);
  }

  getProductsByCategory(id: any) {
    return this.httpClient.get(`${this.url}/product/category/${id}`)
  }

  getProductById(id: any) {
    return this.httpClient.get(`${this.url}/product/${id}`)
  }

  add(data: any) {
    return this.httpClient.post(`${this.url}/product`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  update(data: any) {
    return this.httpClient.put(`${this.url}/product/update`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  updateStatus(data: any) {
    return this.httpClient.patch(`${this.url}/product/updateStatus`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  delete(id: any) {
    return this.httpClient.delete(`${this.url}/product/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
