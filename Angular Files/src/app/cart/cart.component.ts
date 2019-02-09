import { Router } from '@angular/router';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Product } from '../models/product';
import { User, CartItem, Order } from '../models/user';
import { Subscriber } from 'rxjs/Subscriber';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements AfterViewChecked {

    //CART STUFF
    userInfo: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:"", bAddress:"", bCity:"", bProvince:"", bCountry:"", bPostalCode:"", bPhoneNumber:"", Cart:[], admin: false};
    userOrder: Order = { uid:"", OItems:[], Status:"", Done:false };
    userCart: CartItem[];
    country_: string;
    address_: string;
    city_: string;
    province_: string;
    postalcode_: string;
    phone_: string;
    firstname_: string;
    lastname_: string;
    bcountry_: string;
    baddress_: string;
    bcity_: string;
    bprovince_: string;
    bpostalcode_: string;
    bphone_: string;
    cartInfo: CartItem = { Name:"", URL:"", Category:"", Size:"", Price: 0, Quantity: 0, TPrice:0 };
    cartItems: CartItem[] = [];
    totalPrice: number = 0;

    //products_: Product[];

  //PAYPAL INTEGRATION
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;




  paypalConfig = {
    env:'sandbox',
    client: {
        sandbox: 'ASCNjm2T9LGu2bYjbuyQyvkxmVHzXrds6Q_zODZuTOHBgx37cDqp59ytRFAvvAys98kHL54sIsGG4o9K',
        production: '<production-id-here>'
    },
    style: {
        label: 'paypal',
        size:  'medium',    // small | medium | large | responsive
        shape: 'rect',     // pill | rect
        color: 'blue',     // gold | blue | silver | black
        tagline: false
    },
    commit: true,
    payment: (data, actions) => {
        return actions.payment.create({
            payment:{
                transactions: [
                    {amount: {total: this.totalPrice, currency: 'CAD'}}
                ]
            }
        });
    },
    onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
            //console.log(Pay)
            this.makeOrder()

            this.alertBox()
            this.router.navigate(['/'])
            this.emptyCart()
            
            //do something when payment is successful
        })
    }
  };

  ngAfterViewChecked(): void{
    if(!this.addScript){
        this.addPaypalScript().then(() => {
            paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
            this.paypalLoad = false;
        })
    }
  };

  addPaypalScript(){
      this.addScript = true;
      return new Promise((resolve, reject) => {
          let scriptagElement = document.createElement('script');
          scriptagElement.src = "https://www.paypalobjects.com/api/checkout.js";
          scriptagElement.onload = resolve;
          document.body.appendChild(scriptagElement);
      })
  };


  constructor(private authService: AuthService, private userService: UserService, private router: Router, private productService: ProductService) {
    console.log(authService.currentUserId);

   }


    alertBox(){
    window.alert("Payment Success!");
   }

    makeOrder(){
    this.userOrder.uid = this.authService.currentUserId.toString();
    this.userOrder.Done = false;
    this.userOrder.Status = "Order sent to Clayson!";
    this.userOrder.OItems = this.userInfo.Cart;
    this.userService.addOrder(this.userOrder);
   }


  getUser(){
    this.userService.getUser(this.authService.currentUserId).subscribe(item => {
      //this.userInfo = item;
      this.firstname_ = item.FirstName;
      this.lastname_ = item.LastName;
      this.country_ = item.Country;
      this.address_ = item.Address;
      this.city_ = item.City;
      this.province_ = item.Province;
      this.postalcode_ = item.PostalCode;
      this.phone_ = item.PhoneNumber;
      this.bcountry_ = item.bCountry;
      this.baddress_ = item.bAddress;
      this.bcity_ = item.bCity;
      this.bprovince_ = item.bProvince;
      this.bpostalcode_ = item.bPostalCode;
      this.bphone_ = item.bPhoneNumber;


      this.userInfo.Cart = item.Cart;
      //console.log(this.uName);
    });

  }

  displayC(){
    this.getUser();
    this.cartItems = [];
    this.totalPrice = 0;
    this.userService.getUser(this.authService.currentUserId).subscribe(user => {
        this.cartItems = [];
        this.totalPrice = 0;
        for (var i = 0; i < user.Cart.length; i++){
            this.cartInfo = user.Cart[i];
            this.totalPrice += user.Cart[i].TPrice;
            this.cartItems.push(this.cartInfo);

        }
    });

  }

  deleteItem(value){
    this.userInfo.Cart.splice(value, 1);
    this.cartItems = [];
    this.populateUser();
    this.userService.addCart(this.userInfo.Cart, this.authService.currentUserId);
    this.displayC();
  }


  addItem(value){
    //console.log(value);
    if (this.userInfo.Cart[value].Quantity < 5){
    this.cartItems = [];
    this.userInfo.Cart[value].Quantity += 1;
    this.userInfo.Cart[value].TPrice = this.userInfo.Cart[value].Price * this.userInfo.Cart[value].Quantity;
    this.populateUser();
    this.userService.addCart(this.userInfo.Cart, this.authService.currentUserId);
    this.displayC();
    }
  }

  decreaseItem(value){
    //console.log(value);
    if (this.userInfo.Cart[value].Quantity > 1){
    this.cartItems = [];
    this.userInfo.Cart[value].Quantity -= 1;
    this.userInfo.Cart[value].TPrice = this.userInfo.Cart[value].Price * this.userInfo.Cart[value].Quantity;
    this.populateUser();
    this.userService.addCart(this.userInfo.Cart, this.authService.currentUserId);
    this.displayC();
    }
  }


  emptyCart(){
    this.getUser();
    this.userInfo.Cart = [];
    this.populateUser();
    this.userService.addCart(this.userInfo.Cart, this.authService.currentUserId);
  }

  populateUser(){/*
    this.userInfo.Cart = [];
    this.totalPrice = 0;
    for (var i = 0; i < this.cartItems.length; i++){
        this.cartInfo = this.cartItems[i];
        this.totalPrice += this.cartItems[i].TPrice;
        this.userInfo.Cart.push(this.cartInfo);
    }
    this.userInfo.Cart = this.cartItems;*/
    //console.log(this.firstname_);
    this.userInfo.Email = this.authService.currentUserName.toString();
    this.userInfo.FirstName = this.firstname_;
    this.userInfo.LastName = this.lastname_;
    this.userInfo.Country = this.country_;
    this.userInfo.Address = this.address_;
    this.userInfo.City = this.city_;
    this.userInfo.Province = this.province_;
    this.userInfo.PostalCode = this.postalcode_;
    this.userInfo.PhoneNumber = this.phone_;
    this.userInfo.bCountry = this.bcountry_;
    this.userInfo.bAddress = this.baddress_;
    this.userInfo.bCity = this.bcity_;
    this.userInfo.bProvince = this.bprovince_;
    this.userInfo.bPostalCode = this.bpostalcode_;
    this.userInfo.bPhoneNumber = this.bphone_;
  }
}
