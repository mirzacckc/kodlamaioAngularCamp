
import { AdditionalCartItem } from './../models/additionalCartItem';
import { AdditionalService } from './../models/additionalService';
import { Car } from 'src/app/models/car';
import { Injectable } from '@angular/core';
import { AdditionalCartItems, CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:Car){
    let item = CartItems.find(c=>c.car.id===car.id);
    if(item){
      item.quantity+=1;
    }else{
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity =1;
      CartItems.push(cartItem)
    }
  }

  addToCart2(additionalService:AdditionalService){
    let item = AdditionalCartItems.find(c=>c.additionalService.id===additionalService.id);
    if(item){
      item.quantity+=1;
    }else{
      let cartItems = new AdditionalCartItem();
      cartItems.additionalService = additionalService;
      cartItems.quantity =1;
      AdditionalCartItems.push(cartItems)
    }
  }

  getTotalQuantity():any{
    let total = 0;
    CartItems.forEach(element => {
      total = total + element.quantity
    });

    AdditionalCartItems.forEach(element => {
      total = total + element.quantity  
    });
    return total;
  }

  getTotal():any{
    let total = 0;
    CartItems.forEach(element => {
      total = total + element.quantity * element.car.dailyPrice
    });

    AdditionalCartItems.forEach(element => {
      total = total + element.quantity * element.additionalService.price   
    });
    return total;
  }

  removeFromCart(car:Car){
    let item:CartItem = CartItems.find(c=>c.car.id===car.id);
    CartItems.splice(CartItems.indexOf(item),1);  //splice remove etmek demektir.
  }

  removeFromCart2(additionalService:AdditionalService){
    let item:AdditionalCartItem = AdditionalCartItems.find(c=>c.additionalService.id===additionalService.id);
    AdditionalCartItems.splice(AdditionalCartItems.indexOf(item),1);  //splice remove etmek demektir.
  }

  list():CartItem[]{
    return CartItems;
  }

  list2():AdditionalCartItem[]{
    return AdditionalCartItems;
  }

  
}
