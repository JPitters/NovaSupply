import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CollectService } from '../services/collect.service';
import { CollectionInt } from '../models/collect';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-nvgallery',
  templateUrl: './nvgallery.component.html',
  styleUrls: ['./nvgallery.component.css']
})
export class NvgalleryComponent implements OnInit {
  items: Product[]= [];
  gPID: Array<string>= [];
  gID: string = localStorage['galleryID'];

  constructor(private productService: ProductService, private collectService: CollectService) { }

  ngOnInit() {/*
    this.collectService.getCollect(this.gID).subscribe(item => {
      for (var i=0; i < item.pID.length; i++){
        this.gPID.push(item.pID[i]);
      }

      for (var i=0; i < this.gPID.length; i++){
      this.productService.getProduct(this.gPID[i]).subscribe(item => {
        this.items.push(item);
        });
      }
   });*/
   this.productService.getAllProducts().subscribe(item => {
    for (var i = 0; i < item.length; i++){
      if (item[i].Category = this.gID){
        this.items.push(item[i]);
      }
    }
  });
  }
  storeItem(value){
    localStorage['keyID'] = this.items[value].id;
  }
}
