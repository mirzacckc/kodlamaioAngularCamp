import { MessageService } from 'primeng/api';
import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  brandAddForm:FormGroup;
  brand:Brand

  constructor(private formBuilder:FormBuilder,private brandService:BrandService, private messageService:MessageService) { }
  ngOnInit(): void {
    this.createBrandAddForm();
  }
  
  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      name:["",Validators.required],
      image:["../assets/logos/",Validators.required]
    })
  }
  add(){
    if(this.brandAddForm.valid){
      this.brand=Object.assign({},this.brandAddForm.value)
    }
    this.brandService.addBrand(this.brand).subscribe(data=>{
      setTimeout(() => {
        location.reload();
      }, 1500);
      this.messageService.add({
        severity: 'success',
        summary: 'Category Successfully Added',
        detail: data.name,
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
