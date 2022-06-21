import { AuthService } from 'src/app/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdditionalCartItem } from 'src/app/models/additionalCartItem';
import { AdditionalService } from 'src/app/models/additionalService';
import { Address } from 'src/app/models/address';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { City } from 'src/app/models/city';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  
  cartItems: CartItem[] = [];
  additionalCartItems:AdditionalCartItem[]=[]
  addressAddForm:FormGroup;
  cities:City[];
  users:User[];
  address:Address;
  selectedUser:User;
  selectedCity:City;

  constructor(public cartService: CartService,private formBuilder:FormBuilder
    ,private addressService:AddressService,private messageService:MessageService,
    private authService:AuthService) { }

    createAddressAddForm(){
      this.addressAddForm=this.formBuilder.group({
        userFirstName:["",Validators.required],    
        userLastName:["",Validators.required],
        phone:["",Validators.required],
        email:["",Validators.required], 
        country:["",Validators.required],         
        cityId:["",Validators.required],
        cityName:[""],
        address1:["",Validators.required],
        address2:["",Validators.required],       
      })
    }

  ngOnInit(): void {
    this.getCartItems()
    this.createAddressAddForm();
    this.getCities();
    this.getUsers();
  }
  getCartItems() {
    this.cartItems = this.cartService.list();
    this.additionalCartItems = this.cartService.list2();
  }
  removeFromCart(car:Car){
    this.cartService.removeFromCart(car)
  }
  removeFromCart2(additionalService:AdditionalService){
    this.cartService.removeFromCart2(additionalService)
  }

  getCities(){
    this.addressService.getCities().subscribe(data=>{
      this.cities=data
    })
  }

  getUsers(){
    this.authService.getUsers().subscribe(data=>{
      this.users=data
    })
  }

  add(){
    ///let selectedUser=this.users.find(element => element.id==this.addressAddForm.value.userId)
    //let selectedUser2=this.users.find(element => element.id==this.addressAddForm.value.userId)
    let selectedCity=this.cities.find(element => element.id==this.addressAddForm.value.cityId)
    //this.addressAddForm.value.userId=parseInt(this.addressAddForm.value.userId)
    this.addressAddForm.value.cityId=parseInt(this.addressAddForm.value.cityId)
    //this.addressAddForm.value.userFirstName=selectedUser.firstName
    //this.addressAddForm.value.userLastName=selectedUser2.lastName
    this.addressAddForm.value.cityName=selectedCity.name
    if(this.addressAddForm.valid){
      this.address=Object.assign({},this.addressAddForm.value)
    }  
    this.addressService.addAddress(this.address).subscribe(data=>{
      setTimeout(() => {
        location.reload();
      }, 1500);
      this.messageService.add({
        severity: 'success',
        summary: 'Sale Successfully',
        detail: 'Sayın ' + data.userFirstName +' '+ data.userLastName + '. Siparişiniz alınmıştır.'
      })
    }) 
  }
}
