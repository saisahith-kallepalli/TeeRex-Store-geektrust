import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  filterTheItemFromCart = (id: string) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = cart.filter((each: any) => each.id === id);
    return exits;
  };
  reduceQuantity = (id: string) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cart === 1) {
      cart = cart;
    } else {
      cart = cart.map((each: any) => {
        if (each.id === id) {
          return { ...each, cart: each.cart - 1 };
        } else {
          return { ...each };
        }
      });
    }
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  increaseQuantity = (id: string) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cart !== exits[0].quantity) {
      cart = cart.map((each: any) => {
        if (each.id === id) {
          return { ...each, cart: each.cart + 1 };
        } else {
          return { ...each };
        }
      });
    }
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  valueOfCart(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart;
  }
  disableAddition(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart === exits[0]?.quantity;
  }
  disableReduce(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart === 1;
  }
  onDelete = (id: string) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((each: any) => each.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart = cart;
  };
  get grandTotal() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let total = 0;
    cart.forEach((a: any) => {
      total += a.price * a.cart;
    });
    return total;
  }
}
