import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  user:User

  constructor(private authService:AuthService,private formbuilder:FormBuilder,private messageService:MessageService, private router:Router) { }

  ngOnInit(): void {
    this. createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formbuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      this.user = Object.assign({},this.loginForm.value)
    }
    this.authService.login(this.user).subscribe(data=>{
      if(data.length>0){
        localStorage.setItem("token", "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ")
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successfully'
        })
        this.router.navigate(['cars/carlist'])
      }
      else{
        this.messageService.add({
          severity: 'error',
          summary: 'Login information is incorrect',
          detail: 'Please check your information'
        })
      }
    })
  }




}
