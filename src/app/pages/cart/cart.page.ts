import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { cartItems } from '../cart/cart.model';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: any[] = [];


  constructor(private cartService: CartService, private st: Storage) {

    }

  async ngOnInit() {
     this.cartService.getCart().then(res => {
      this.cart = res;
    });
  }
  getCartAmount() {
    this.cartService.getCartItmCount();
  }
  decreaseCartIterm(product: any) {
    this.cartService.decreasProduct(product);
  }
  increaseCartItem(product: any) {
    this.cartService.addProduct(product);
  }
  removeCartItem(product: any) {
    this.cartService.removeProduct(product);
  }
  getTotal() {
    return this.cart.reduce((i, j) => i + j.Price * j.amount, 0);
  }
}
