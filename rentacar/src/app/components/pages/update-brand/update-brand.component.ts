import { MessageService } from 'primeng/api';
import { BrandService } from './../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brand:Brand ;
  selectedBrandId:number;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private activatedRoute:ActivatedRoute,private messageService:MessageService) { }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      id:[this.brand.id,Validators.required],
      name:[this.brand.name,Validators.required],
      image:[this.brand.image,Validators.required]
    })
  }
  
  ngOnInit(): void {
    this.getBrandById();
  }
  
  

  getBrandById(){
    this.activatedRoute.params.subscribe(params =>{
      if(params['id']) this.selectedBrandId=params['id'];   
    })    
      this.brandService.getBrandById(this.selectedBrandId).subscribe(data =>{
        this.brand = data
        this.createBrandUpdateForm();
      })        
  }

  update(){
    if(this.brandUpdateForm.valid){
      this.brand=Object.assign({},this.brandUpdateForm.value)
    }
    this.brandService.updateBrand(this.brand).subscribe(data=>{
      setTimeout(() => {
        location.reload();
      }, 1500);
      this.messageService.add({
        severity: 'success',
        summary: 'Product Successfully Updated',
        detail: data.name
      })
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
