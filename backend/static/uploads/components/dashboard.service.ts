import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly httpClient: HttpClient) {}

  getProduct(): Observable<IProduct[]> {
    const res = this.httpClient.get<IProduct[]>(
      'https://fakestoreapi.com/products'
    );
    return res;
  }
}
