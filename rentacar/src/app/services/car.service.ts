import { Car } from './../models/car';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<Car[]>{
    return this.httpClient.get<Car[]>("http://localhost:3000/cars")
  }

  getCarByColor(colorId:number):Observable<Car[]>{
    let newPath = "http://localhost:3000/cars" + ("?colorId=") + colorId
    return this.httpClient.get<Car[]>(newPath)
  }

  getCarByBrand(brandId:number):Observable<Car[]>{
    let newPath = "http://localhost:3000/cars" + ("?brandId=") + brandId
    return this.httpClient.get<Car[]>(newPath)
  }

  deleteCar(val:Number):Observable<Car>{
    return this.httpClient.delete<Car>("http://localhost:3000/cars/"+val)
  }

  addCar(car:Car):Observable<Car>{
    return this.httpClient.post<Car>("http://localhost:3000/cars",car)
  }

  getCarById(carId:number):Observable<Car>{
    let newPath = "http://localhost:3000/cars/" + (carId)
    return this.httpClient.get<Car>(newPath)
  }

  updateCar(car:Car):Observable<Car>{
    return this.httpClient.put<Car>("http://localhost:3000/cars/"+car.id,car)
  }

 
}
