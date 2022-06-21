import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './common/navi/navi.component';
import { BrandListComponent } from './common/sidebar/brand-list/brand-list.component';
import { UpdateBrandComponent } from './components/pages/update-brand/update-brand.component';
import { AddBrandComponent } from './components/pages/add-brand/add-brand.component';

import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {BadgeModule} from 'primeng/badge';

import { ColorListComponent } from './common/sidebar/color-list/color-list.component';
import { CarListComponent } from './components/pages/car-list/car-list.component';
import { AddCarComponent } from './components/pages/add-car/add-car.component';
import { UpdateCarComponent } from './components/pages/update-car/update-car.component';
import { AddColorComponent } from './components/pages/add-color/add-color.component';
import { RentCarComponent } from './components/pages/rent-car/rent-car.component';
import { CartSummaryComponent } from './common/cart-summary/cart-summary.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CartDetailComponent } from './components/pages/cart-detail/cart-detail.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandListComponent,
    UpdateBrandComponent,
    AddBrandComponent,
    ColorListComponent,
    CarListComponent,
    AddCarComponent,
    UpdateCarComponent,
    AddColorComponent,
    RentCarComponent,
    CartSummaryComponent,
    LoginComponent,
    RegisterComponent,
    CartDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    DropdownModule,
    BadgeModule
  ],
  providers: [MessageService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
