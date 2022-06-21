import { City } from './../models/city';
import { Address} from './../models/address';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient:HttpClient) { }

  getCities():Observable<City[]>{
    return this.httpClient.get<City[]>("http://localhost:3000/cities")
  }

  getAdress():Observable<Address[]>{
    return this.httpClient.get<Address[]>("http://localhost:3000/address")
  }

  addAddress(address:Address):Observable<Address>{
    return this.httpClient.post<Address>("http://localhost:3000/address",address)
}
}
