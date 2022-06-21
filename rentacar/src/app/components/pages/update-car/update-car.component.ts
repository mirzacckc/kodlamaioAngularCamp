import { ColorService } from './../../../services/color.service';
import { BrandService } from './../../../services/brand.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CarService } from './../../../services/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  carUpdateForm:FormGroup
  car:Car
  selectedCarId:number;  
  brands:Brand[];
  colors:Color[];

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder,private messageService:MessageService,
    private brandService:BrandService,private colorService:ColorService) { }

  createCarAddForm(){
    this.carUpdateForm=this.formBuilder.group({
      id:[this.car.id,Validators.required],
      brandName:[this.car.brandName],
      brandId:[this.car.brandId,Validators.required],
      colorName:[this.car.brandId],
      colorId:[this.car.colorId,Validators.required], 
      dailyPrice:[this.car.dailyPrice,Validators.required],      
      description:[this.car.description,Validators.required],
      image:[this.car.image,Validators.required]
    })
  }

  ngOnInit(): void {
    this. getBrandById();
    this.getBrand();
    this. getColor();
  }

  getBrandById(){
    this.activatedRoute.params.subscribe(params =>{
      if(params['id']) this.selectedCarId=params['id'];   
    })    
      this.carService.getCarById(this.selectedCarId).subscribe(data =>{
        this.car = data
        this.createCarAddForm();
      })        
  }

  update(){
    let selectedBrand=this.brands.find(element => element.id==this.carUpdateForm.value.brandId)
    let selectedColor=this.colors.find(element => element.id==this.carUpdateForm.value.colorId)
    this.carUpdateForm.value.brandId=parseInt(this.carUpdateForm.value.brandId)
    this.carUpdateForm.value.colorId=parseInt(this.carUpdateForm.value.colorId)
    this.carUpdateForm.value.brandName=selectedBrand.name
    this.carUpdateForm.value.colorName=selectedColor.name
    if(this.carUpdateForm.valid){
      this.car=Object.assign({},this.carUpdateForm.value)
    }
    this.carService.updateCar(this.car).subscribe(data=>{
      setTimeout(() => {
        location.reload();
      }, 1500);
      this.messageService.add({
        severity: 'success',
        summary: 'Product Successfully Updated',
        detail: data.brandName
      })
    })
  }

  getBrand(){
    this.brandService.getBrands().subscribe(data=>{
      this.brands=data
    })
  }

  getColor(){
    this.colorService.getColors().subscribe(data=>{
      this.colors=data
    })
  }

  canDeactivate(): Promise<any> | boolean {
    const confirmResult = confirm('Are you sure you want to leave this page ? ');
    if (confirmResult === true) {
      return true;
    } else {
      return false;
    }
  }


}
