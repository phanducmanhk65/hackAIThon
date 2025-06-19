import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

export interface IProduct {
  id: number;
  price: number;
  description: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [TableModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  title = 'APP';
  products: IProduct[] = [];
  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.dashboardService.getProduct().subscribe((res) => {
      this.products = res;
    });
  }
}
