import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartItems } from '../pages/cart/cart.model';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: cartItems[] = [];
  // private cartItemCount = new BehaviorSubject(this.currentCount);
  private cartItemCount: BehaviorSubject<any>;


  constructor(private st: Storage) {
    this.gettingCount();
  }
  saveCount() {
    this.st.set('storedCount', this.cartItemCount.value);
  }
  async gettingCount() {
    const storedCount = this.st.get('storedCount');
    // tslint:disable-next-line: no-shadowed-variable
    const count = JSON.parse(await storedCount);
    this.cartItemCount = new BehaviorSubject(count);
  }

  saveCart() {
    this.st.set('storedCart', this.cart);
  }
  async gettingCart() {
    const storedCart = await this.st.get('storedCart');
    console.log(storedCart);
    this.cart = storedCart;
  }

  async getCart() {
    const storedCart = await this.st.get('storedCart');
    console.log(storedCart);
    this.cart = storedCart;
    return this.cart;
  }
  getCartItmCount() {
    return this.cartItemCount;
  }
  addProduct(product: cartItems) {
    let added = false;
    for (const p of this.cart) {
      if (p._id === product._id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.saveCount();
    this.saveCart();
  }
  decreasProduct(product: { _id: string }) {
    for (const [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
    this.saveCount();
    this.saveCart();
  }
  removeProduct(product: { _id: string }) {
    for (const [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
    this.saveCount();
    this.saveCart();
  }
}
