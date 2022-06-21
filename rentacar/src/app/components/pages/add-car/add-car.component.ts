import { BrandService } from './../../../services/brand.service';
import { ColorService } from './../../../services/color.service';
import { MessageService } from 'primeng/api';
import { CarService } from './../../../services/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carAddForm:FormGroup;
  car:Car;
  brands:Brand[];
  colors:Color[];
  brandName:string;
  colorName:string;

  constructor(private formBuilder:FormBuilder,private carService:CarService,private messageService:MessageService,private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this. getColor();
    this.getBrand();
    
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],    
      dailyPrice:["",Validators.required],      
      description:["",Validators.required],
      image:["../assets/logos/",Validators.required],
      brandName:[""],
      colorName:[""],
     
    })
  }
  add(){
    let selectedBrand=this.brands.find(element => element.id==this.carAddForm.value.brandId)
    let selectedColor=this.colors.find(element => element.id==this.carAddForm.value.colorId)
    this.carAddForm.value.brandId=parseInt(this.carAddForm.value.brandId)
    this.carAddForm.value.colorId=parseInt(this.carAddForm.value.colorId)
    this.carAddForm.value.brandName=selectedBrand.name
    this.carAddForm.value.colorName=selectedColor.name
    if(this.carAddForm.valid){
      this.car=Object.assign({},this.carAddForm.value)
    }  
    this.carService.addCar(this.car).subscribe(data=>{
      setTimeout(() => {
        location.reload();
      }, 1500);
      this.messageService.add({
        severity: 'success',
        summary: 'Category Successfully Added',
        detail: data.brandName,
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
