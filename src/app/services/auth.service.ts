import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiurl;
  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url + '/auth/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/auth/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken() {
    return this.httpClient.get(`${this.url}/auth/checkToken`)
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return token ? true : false;
  }
}
