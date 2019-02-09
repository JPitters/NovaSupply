import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Product } from '../models/product';
import { User, CartItem } from '../models/user';
//import { userInfo } from 'os';

//declare var jquery:any;
//declare var $ :any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  products: Product[];
  product: Product;
  productid: string = localStorage['keyID'];

  pURL: string = "";
  pName: string = "";
  pDetails: string = "";
  pPrice: number = 0;
  pSize: Array<string> = [];
  pStock: Array<number> = [];
  pCategory: string = "";
  quant: number = 0;
  cI: number = 0;

  userInfo: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:"", bAddress:"", bCity:"", bProvince:"", bCountry:"", bPostalCode:"", bPhoneNumber:"", Cart:[], admin: false};
  //userInfo: User;
  userCart: CartItem[];
  addedItem: CartItem = {ProdID:"", URL:"", Category:"", Size:"", Price:0, Quantity:0,TPrice:0}
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

  constructor(private authService: AuthService, private productService: ProductService, private userService: UserService) { }
  
    ngOnInit() {
      this.productService.getProduct(this.productid).subscribe(item => {
        this.product = item;
        this.pName = item.Name;
        this.pDetails = item.Details;
        this.pPrice = item.Price;
        this.pURL = item.URL;
        this.pSize = item.Sizes;
        this.pStock = item.Stock;
        this.pCategory = item.Category;
        this.quant = 1;
        this.cI = 0;
      });
      
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
        this.userCart = item.Cart;
        //console.log(this.uName);
      });


      //this.getUser();
      //console.log(this.product);
      //this.product = this.productService.getProduct(this.productid);
    }

    getUser(){
      this.userService.getUser(this.authService.currentUserId).subscribe(item => {
        //this.userInfo = item;
        if (item.Email != null){
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

        this.userCart = item.Cart;
        //console.log(this.uName);
        }
      });
      
    }

    currentI(value){
      this.cI = value;
    }

    addToCart(){
      this.getUser();
      var found = false;
      if (this.userCart.length == 0){
        this.userCart = [];
      }
      else{
        for (var i = 0; i < this.userCart.length; i++){
          if (this.userCart[i].ProdID == this.productid && this.userCart[i].Size == this.pSize[this.cI]){
            if ((this.quant + this.userCart[i].Quantity) >= 5){
              this.userCart[i].Quantity = 5;
              this.userCart[i].TPrice = this.pPrice * 5;
            }
            else{
              this.userCart[i].Quantity += this.quant;
              this.userCart[i].TPrice = this.pPrice * (this.userCart[i].Quantity + this.quant);
            }
            found = true;
            break;
          }
        }
      }

      if (found == false){
        if (this.quant >= 5){
          this.addedItem.Quantity = 5;
          this.addedItem.TPrice = this.pPrice * 5;
        }
        else{
          this.addedItem.Quantity = this.quant;
          this.addedItem.TPrice = this.pPrice * this.quant;
        }

        //console.log(this.productid);
      this.addedItem.ProdID = this.productid;
      //console.log(this.pSize[this.cI]);
      this.addedItem.Size = this.pSize[this.cI];
      //console.log(this.quant);
      
      this.addedItem.Price = this.pPrice;
      this.addedItem.URL = this.pURL;
      this.addedItem.Category = this.pCategory;
      this.addedItem.Name = this.pName;

      this.userCart.push(this.addedItem);
      }

      //console.log(this.uName);
      //console.log(this.authService.currentUserName.toString());
      //console.log(this.userCart);
      //console.log(this.cProductID);
      
      /* steps
      1) get the user cart info
      2) set the variables, and append the user cart variables 
      3) update the user cart info in db
      */

      //Potential issues
      //  Might need to convert the string into an array and determine if there are multiple entries of the same product
      //  Need to check if the string is empty before appending

      

      //console.log(this.userCart);
      this.populateUser();
      //console.log(this.userInfo);

      this.userService.addCart(this.userInfo.Cart, this.authService.currentUserId);
      //end of func
    }

    populateUser(){
      this.userInfo.Cart = this.userCart;
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
    //end of class
}


/*
$(document).ready(function() {
   $('.color-choose input').on('click', function() {
       var headphonesColor = $(this).attr('data-image');
  
       $('.active').removeClass('active');
       $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
       $(this).addClass('active');
   });
  
 });
*/