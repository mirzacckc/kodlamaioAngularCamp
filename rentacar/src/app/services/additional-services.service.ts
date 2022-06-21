import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdditionalService } from '../models/additionalService';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServicesService {

  constructor(private httpClient:HttpClient) { }

  getAdditionalServices():Observable<AdditionalService[]>{
    return this.httpClient.get<AdditionalService[]>("http://localhost:3000/additionalServices")
  }
}
