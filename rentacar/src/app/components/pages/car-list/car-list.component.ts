import { CartService } from './../../../services/cart.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars:Car[];
  selectedCategoryId:number;

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private messageService:MessageService,private cartService:CartService) { }

  ngOnInit(): void {
     this.getCars();
  }

 
  getCars(){
    this.activatedRoute.params.subscribe(params =>{
      if(params['colorId']){
        this.selectedCategoryId=params['colorId'];
        this.carService.getCarByColor(this.selectedCategoryId).subscribe(data =>{
          this.cars = data
      })   
    }    
    else if(params['brandId']){
      this.selectedCategoryId=params['brandId']; 
      this.carService.getCarByBrand(this.selectedCategoryId).subscribe(data =>{
        this.cars = data      
      }) 
    }
    else{
      this.carService.getCars().subscribe(data => {
        this.cars = data;
      }) 
    }
  })
  }
   
 

  carDelete(val:Number){
    if(confirm("Are you sure want to delete?")){
      this.carService.deleteCar(val).subscribe(()=>{
        setTimeout(() => {
          location.reload();
        }, 1500);
        this.messageService.add({
          severity: 'warn',
          summary: 'Brand Successfully Deleted'
        })
      })
    }
  }

  selectedCarId(selectedCar:Car):void{
    window.location.href= `car/${selectedCar.id}`
}

  addToCart(car:Car){
    this.cartService.addToCart(car)
  }

}
