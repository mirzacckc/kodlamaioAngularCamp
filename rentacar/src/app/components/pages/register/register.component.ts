import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './../../../services/auth.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup
  user:User=new User()

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName: ["",Validators.required],
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({},this.registerForm.value)
      this.authService.addUser(this.user).subscribe(response=>{
        setTimeout(() => {
          window.location.href="/login"
        }, 1000);
        this.messageService.add({
          severity:'success',
          summary:'Register successful!',
          detail: response.firstName + " " +response.lastName,
        }) 
      })         
     
    }
  }

}
