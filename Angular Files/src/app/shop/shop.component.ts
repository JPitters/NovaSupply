import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProductService } from '../services/product.service';
import { Product, Order } from '../models/product';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

//static var sort = false;
//static var sPrice = false;


export class ShopComponent implements OnInit {
  items: Product[];
  order_: Order;
  Name_: string = "Name";
  Price_: string = "Price";
  
  static sort_: boolean = false;
  static na_: boolean = false;
  static pr_: boolean = false;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    if(ShopComponent.sort_ == false){
      this.getAllItems();
    } else {
      //this.orderByNameDesc();
      this.getAllItems();
    }
    
    //while(this.items == null){
    //  this.loadItems();
    //}
  }

  //Loads documents/ items from the service "Product" 
  private getAllItems(){
    this.productService.getAllProducts().subscribe(items => {
      this.items = items;
    });
  }

  //Functions to order with
  /*orderByNameAsc(){
    this.order_.field = "Name";
    this.order_.order = "asc";
    this.productService.orderCollection( this.order_ ); 
    ShopComponent.sort_ = true;

    this.ngOnInit();
  }
  orderByNameDesc(){
    this.order_.field = "Name";
    this.order_.order = "desc";
    this.productService.orderCollection( this.order_ ); 
    ShopComponent.sort_ = true;

    this.ngOnInit();
  }

  //PRICE
  orderByPriceAsc(){
    this.order_.field = "Price";
    this.order_.order = "asc";
    this.productService.orderCollection( this.order_ );
  }

  orderByPriceDesc(){
    this.orderShopPage("Price", "desc");
  }

  private orderShopPage(obj: string, order: string = "asc"){
    this.order_.field = obj;
    this.order_.order = order;

    this.productService.orderCollection( this.order_ ); 
  }*/


  //This function display stores item ID
  storeItem(item){
    localStorage['keyID'] = item.id;
  }

  //Figure out how to make this admin-only
  //deleteItem(event, item){
  //  this.productService.deleteItem(item);
  //}
}
