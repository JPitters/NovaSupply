import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {UserService} from '../services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent  {

  userInfo: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:"", bAddress:"", bCity:"", bProvince:"", bCountry:"", bPostalCode:"", bPhoneNumber:"", Cart: [], admin: false};
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


  constructor(public authService: AuthService, public userService: UserService) { 


  }

  
}
