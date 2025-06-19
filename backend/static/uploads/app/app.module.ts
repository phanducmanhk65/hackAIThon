import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DashboardModule } from '../components/dashboard/dashboard.module';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  providers: [provideHttpClient()],
})
export class AppModule {}
