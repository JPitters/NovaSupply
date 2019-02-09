import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../services/user.service';
import { User, Order } from '../models/user';
import { Observable } from 'rxjs/Observable';
//import { Cart } from '../models/user';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent/* implements OnInit*/ {

  isNewUser = true;
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  orders: Order[];
  orderUser: User[];
  userInfo: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:"", bAddress:"", bCity:"", bProvince:"", bCountry:"", bPostalCode:"", bPhoneNumber:"", Cart: [], admin: false};
  tempUser: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:"", bAddress:"", bCity:"", bProvince:"", bCountry:"", bPostalCode:"", bPhoneNumber:"", Cart: [], admin: false};
  userInfo1: User;
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
  itemUser: User[];


  ocountry_: string;
  oaddress_: string;
  ocity_: string;
  oprovince_: string;
  opostalcode_: string;
  ophone_: string;
  ofirstname_: string;
  olastname_: string;
  obcountry_: string;
  obaddress_: string;
  obcity_: string;
  obprovince_: string;
  obpostalcode_: string;
  obphone_: string;

  oUID: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private productService: ProductService) {
    console.log(authService.currentUserId);
    this.orderUser = [];
    this.productService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      //this.oUID = orders[0].uid;
      console.log(this.orders);
      
      //this.oUID = orders[0].uid;
      //console.log(this.oUID);
    });

   }

 /* ngOnInit() { 

    //console.log(this.authService.currentUserId);
    //this.getUserInfo();

  }*/

  logout() {
    this.authService.signOut();
  }

  getUserInfo(){
    this.userService.getUser(this.authService.currentUserId).subscribe(item => { 
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
    });
  }

  updateUser(){
    this.userInfo.FirstName = this.firstname_;
    this.userInfo.LastName = this.lastname_;
    this.userInfo.Address = this.address_;
    this.userInfo.City = this.city_;
    this.userInfo.Province = this.province_;
    this.userInfo.Country = this.country_;
    this.userInfo.PostalCode = this.postalcode_;
    this.userInfo.PhoneNumber = this.phone_;
    this.userInfo.bAddress = this.baddress_;
    this.userInfo.bCity = this.bcity_;
    this.userInfo.bProvince = this.bprovince_;
    this.userInfo.bCountry = this.bcountry_;
    this.userInfo.bPostalCode = this.bpostalcode_;
    this.userInfo.bPhoneNumber = this.bphone_;
  }

  editUser(){
    this.updateUser();
    //this.userService.addUser(this.userInfo, this.authService.currentUserName);
    this.userService.addUser(this.userInfo, this.authService.currentUserId);
  }

  addUser(){
    this.updateUser();
    //this.userService.addUser(this.userInfo, this.authService.currentUserName);
    this.userService.addUser(this.userInfo, this.authService.currentUserId);
    window.alert("Changes Saved!");
  }

  showUsers(){
    
  }

   getUsername(id: string){
    //this.oUID = "Test";
    /*
    this.userService.getUser(id).subscribe(item => {
      this.oUID = item.FirstName.toString();
    });*/
    //return this.oUID.toString();
    return "dasdasdsad";
  }

  private getOrders(){
    /*this.productService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      //this.oUID = orders[0].uid;
      console.log(this.orders);
      console.log(this.oUID);
      this.oUID.push(orders[0].uid);
    });*/

    for (var i = 0; i < this.orders.length; i++){
        //assuming this.orders[i].uid returns the correct ID
        this.userService.getUser(this.orders[i].uid).subscribe(user => {
        //this.orderUser.push(item);
          /*
        console.log(this.oUID);
        this.ofirstname_ = item.FirstName;
        console.log(this.ofirstname_);
        this.olastname_ = item.LastName;
        this.ocountry_ = item.Country;
        this.oaddress_ = item.Address;
        this.ocity_ = item.City;
        this.oprovince_ = item.Province;
        this.opostalcode_ = item.PostalCode;
        this.ophone_ = item.PhoneNumber;
        this.obcountry_ = item.bCountry;
        this.obaddress_ = item.bAddress;
        this.obcity_ = item.bCity;
        this.obprovince_ = item.bProvince;
        this.obpostalcode_ = item.bPostalCode;
        this.obphone_ = item.bPhoneNumber;*/
        this.tempUser = user;
        this.orderUser.push(this.tempUser);
        //this.orderUser[i] = this.tempUser;
        console.log(this.orderUser);
      });
    }

    /*
    var userIDs = [];
    var realOrder = [];
    
    1) for some reason the order of the users are off despite intended specification
    2) the order seems to return the users in order of what is the smallest 
    


    


    */

  }
} 
