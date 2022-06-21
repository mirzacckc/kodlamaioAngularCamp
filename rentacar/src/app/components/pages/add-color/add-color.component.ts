import { MessageService } from 'primeng/api';
import { ColorService } from './../../../services/color.service';
import { Color } from './../../../models/color';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {

  colorAddForm:FormGroup;
  color:Color


  constructor(private formBuilder:FormBuilder,private colorService:ColorService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }
  
  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      name:["",Validators.required],
      image:["../assets/colors/",Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      this.color=Object.assign({},this.colorAddForm.value)
    }
    this.colorService.addColor(this.color).subscribe(data=>{
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
