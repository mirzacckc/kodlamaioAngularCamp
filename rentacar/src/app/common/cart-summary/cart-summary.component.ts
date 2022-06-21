import { AdditionalService } from './../../models/additionalService';
import { Car } from './../../models/car';
import { AdditionalCartItem } from './../../models/additionalCartItem';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];
  additionalCartItems:AdditionalCartItem[]=[];

  constructor(public cartService:CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  deleteCartItem(car:Car){
      this.cartService.removeFromCart(car);
  }

  deleteAdditionalCartItem(additionalService:AdditionalService){
    this.cartService.removeFromCart2(additionalService);
}

  getCartItems(){
    this.cartItems = this.cartService.list()
    this.additionalCartItems=this.cartService.list2();
   }

  

}
