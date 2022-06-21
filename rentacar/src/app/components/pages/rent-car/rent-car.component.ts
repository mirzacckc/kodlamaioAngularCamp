
import { CartService } from './../../../services/cart.service';
import { AdditionalServicesService } from './../../../services/additional-services.service';
import { Car } from 'src/app/models/car';
import { CarService } from './../../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdditionalService } from 'src/app/models/additionalService';
@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {

  car:Car
  additionalServices:AdditionalService[];
  selectedCarId:number;
  

  constructor(private activatedRoute:ActivatedRoute,private carService:CarService
    ,private additionalServicesService:AdditionalServicesService
    ,private cartService:CartService) { }    


  ngOnInit(): void {
    this. getCarById();
    this.getAdditionalServices();
  }


  getCarById(){
    this.activatedRoute.params.subscribe(params =>{
      if(params['id']) this.selectedCarId=params['id'];   
    })    
      this.carService.getCarById(this.selectedCarId).subscribe(data =>{
        this.car = data
      })        
  }

  getAdditionalServices(){
    this.additionalServicesService.getAdditionalServices().subscribe(data =>{
      this.additionalServices = data
    })
  }

  addToCart2(additionalService:AdditionalService){
    this.cartService.addToCart2(additionalService);
  }

  

}
