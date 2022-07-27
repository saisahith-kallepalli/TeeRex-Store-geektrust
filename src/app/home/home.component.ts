import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}
  searchMobile = false;
  filterMobile = false;
  types = ['Polo', 'Hoodie', 'Basic'];
  colors = ['Red', 'Blue', 'Black'];
  price = [
    { name: '₹0-₹250', value: '0-250' },
    { name: '₹251-₹450', value: '251-450' },
    { name: 'Above ₹451', value: '451' },
  ];
  sidebarControls: any = this.formBuilder.group({
    type: new FormArray([]),
    price: new FormArray([]),
    color: new FormArray([]),
    gender: new FormArray([]),
  });
  value = '';
  shoppingItems: any = [];
  searchedItems: any = [];
  cartItems: any = JSON.parse(localStorage.getItem('cart') || '[]');
  ngOnInit(): void {
    this.dataService
      .getData(
        'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
      )
      .subscribe((data) => {
        this.shoppingItems = data;
        this.searchedItems = data;
        localStorage.setItem('products', JSON.stringify(data));
      });
  }
  //used in components
  valueOfCart(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart;
  }
  disableAddition(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart === exits[0]?.quantity;
  }
  hideTheCarts(id: string) {
    let exits = this.filterTheItemFromCart(id);
    return exits[0]?.cart > 0;
  }
  //reuseable functions
  filterTheOptions = () => {
    const selectedColors = this.sidebarControls.value.color;
    const selectedType = this.sidebarControls.value.type;
    const selectedGender = this.sidebarControls.value.gender;
    const selectedPrice = this.sidebarControls.value.price;
    let data: any = this.searchedItems;
    if (selectedColors.length) {
      const colors = selectedColors.map((color: any) => {
        return data.filter((each: any) => each.color === color);
      });
      data = colors.flat(1);
    }
    if (selectedGender.length) {
      const gender = selectedGender.map((gender: any) => {
        return data.filter((each: any) => each.gender === gender);
      });
      data = gender.flat(1);
    }
    if (selectedType.length) {
      const type = selectedType.map((type: any) => {
        return data.filter((each: any) => each.type === type);
      });
      data = type.flat(1);
    }
    if (selectedPrice.length) {
      const price = selectedPrice.map((each: any) => {
        const limit = each.split('-').map((each: string) => Number(each));
        if (limit.length > 1) {
          return data.filter(
            (each: any) => each.price >= limit[0] && each.price <= limit[1]
          );
        } else {
          return data.filter((each: any) => each.price >= limit[0]);
        }
      });
      data = price.flat(1);
    }
    this.shoppingItems = data;
  };
  filterTheItemFromCart = (id: string) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = cart.filter((each: any) => each.id === id);
    return exits;
  };

  //click on change function
  clearValue = () => {
    this.value = '';
    this.sidebarControls = this.formBuilder.group({
      type: new FormArray([]),
      price: new FormArray([]),
      color: new FormArray([]),
      gender: new FormArray([]),
    });
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    this.searchedItems = products.filter((each: any) =>
      each.name.toLowerCase().includes(this.value.toLowerCase())
    );
    this.shoppingItems = this.searchedItems;
  };
  onChangeSearchProducts = (event: any) => {
    this.sidebarControls = this.formBuilder.group({
      type: new FormArray([]),
      price: new FormArray([]),
      color: new FormArray([]),
      gender: new FormArray([]),
    });
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    this.searchedItems = products.filter((each: any) =>
      each.name.toLowerCase().includes(this.value.toLowerCase())
    );
    this.shoppingItems = this.searchedItems;
  };
  onClickType = (event: any) => {
    let name = this.sidebarControls.get('type') as FormArray;

    if (event.checked) {
      name.push(new FormControl(event.source.value));
    } else {
      let i = 0;
      name.controls.forEach((value, index) => {
        if (value.value === event.source.value) {
          name.removeAt(index);
        }
      });
    }
    this.filterTheOptions();
  };
  onClickPrice = (event: any) => {
    let name = this.sidebarControls.get('price') as FormArray;

    if (event.checked) {
      name.push(new FormControl(event.source.value));
    } else {
      name.controls.forEach((value, index) => {
        if (value.value === event.source.value) {
          name.removeAt(index);
        }
      });
    }
    this.filterTheOptions();
  };
  onClickGender = (event: any) => {
    let name = this.sidebarControls.get('gender') as FormArray;

    if (event.checked) {
      name.push(new FormControl(event.source.value));
    } else {
      name.controls.forEach((value, index) => {
        if (value.value === event.source.value) {
          name.removeAt(index);
        }
      });
    }
    this.filterTheOptions();
  };
  onClickColor = (event: any) => {
    let name = this.sidebarControls.get('color') as FormArray;

    if (event.checked) {
      name.push(new FormControl(event.source.value));
    } else {
      name.controls.forEach((value, index) => {
        if (value.value === event.source.value) {
          name.removeAt(index);
        }
      });
    }

    this.filterTheOptions();

    // if (!selectedColors.length) {
    //   const products = JSON.parse(localStorage.getItem('products') || '[]');
    //   this.searchedItems = products.filter((each: any) =>
    //     each.name.toLowerCase().includes(this.value.toLowerCase())
    //   );
    //   this.shoppingItems = this.searchedItems;
    // }
  };

  onClickAddToCart = (item: any) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(item.id);
    if (exits.length) {
      cart = cart.map((each: any) => {
        if (each.id === item.id) {
          return { ...each, cart: each.cart ? each.cart + 1 : 1 };
        } else {
          return { ...each };
        }
      });
    } else {
      cart.push({ ...item, cart: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
  };

  reduceQuantity = (id: string) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let exits = this.filterTheItemFromCart(id);

    if (exits[0].cart === 1) {
      cart = cart.filter((each: any) => each.id !== id);
    } else {
      cart = cart.map((each: any) => {
        if (each.id === id) {
          return { ...each, cart: each.cart - 1 };
        } else {
          return { ...each };
        }
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
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
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItems = cart;
  };
}
