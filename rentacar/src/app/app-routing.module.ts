import { CanExitGuard } from './guards/can-exit.guard';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './components/pages/add-brand/add-brand.component';
import { AddCarComponent } from './components/pages/add-car/add-car.component';
import { AddColorComponent } from './components/pages/add-color/add-color.component';
import { CarListComponent } from './components/pages/car-list/car-list.component';
import { RentCarComponent } from './components/pages/rent-car/rent-car.component';
import { UpdateBrandComponent } from './components/pages/update-brand/update-brand.component';
import { UpdateCarComponent } from './components/pages/update-car/update-car.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CartDetailComponent } from './components/pages/cart-detail/cart-detail.component';

const routes: Routes = [
  {path:"",pathMatch:"full" ,component:CarListComponent },
  {path:"cars/carlist" ,component:CarListComponent },
  {path:"brand/addBrand" ,component:AddBrandComponent, canActivate:[LoginGuard], canDeactivate:[CanExitGuard] },
  {path:"brand/:id" ,component: UpdateBrandComponent, canActivate:[LoginGuard] },
  {path:"cars/colorId/:colorId" ,component: CarListComponent },
  {path:"car/brandId/:brandId" ,component: CarListComponent },
  {path:"car/add" ,component: AddCarComponent, canActivate:[LoginGuard], canDeactivate:[CanExitGuard] },
  {path:"car/update" ,component: UpdateCarComponent, canActivate:[LoginGuard], canDeactivate:[CanExitGuard] },
  {path:"car/:id" ,component: UpdateCarComponent, canActivate:[LoginGuard] },
  {path:"color/add" ,component: AddColorComponent, canActivate:[LoginGuard], canDeactivate:[CanExitGuard] },
  {path:"car/rent/:id" ,component: RentCarComponent },
  {path:"login" ,component: LoginComponent },
  {path:"user/register" ,component: RegisterComponent },
  {path:"cart-detail" ,component: CartDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
