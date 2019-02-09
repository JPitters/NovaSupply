import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

import { CollectService } from '../services/collect.service';
import { CollectionInt } from '../models/collect';

//file upload 
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  items: Product[];
  citems: CollectionInt[];
  cis: Array<string> = []
  product: Product = { Name:"", Price:0, Details:"", Fabric:"", Description:"", Sizes:[], Stock:[], Category:"", URL:"", Collection:""};

  Name: string;
  Category: string;
  Price: number;
  Details: string;
  Fabric: string;
  Description: string;
  Sizes:Array<string>;
  Stock:Array<number>;
  URL:string;
  qsmall: number;
  qmedium: number;
  qlarge: number;
  qxlarge: number;
  qxxlarge: number;
  qosfm: number;
  small_: boolean;
  medium_: boolean;
  large_: boolean;
  xlarge_: boolean;
  xxlarge_: boolean;
  osfm_: boolean;
  cI: number = 0;

  //file upload
   // Main task 
   task: AngularFireUploadTask;

   // Progress monitoring
   percentage: Observable<number>;
 
   snapshot: Observable<any>;
 
   // Download URL
   downloadURL: Observable<String>;

   newUrl: string;
 
   // State for dropzone CSS toggling
   isHovering: boolean;

  constructor(private productService: ProductService, private storage: AngularFireStorage, private db: AngularFirestore, private collectService: CollectService) { }

  ngOnInit() {
    this.loadItems();
    this.getAllItems();
  }

  //Loads documents/ items from the service "Product" 
  private loadItems(){
    this.productService.getAllProducts().subscribe(items => {
      this.items = items;
    });
  }

  private getAllItems(){
    this.collectService.getAllCollect().subscribe(items => {
      this.citems = items;
      
      this.cis.push("NONE");
      for (var i = 0; i < this.citems.length; i++){
        this.cis.push(this.citems[i].Name);
      }
    });
  }

  currentI(value){
    this.cI = value;
  }
 
  addItem() {
    this.Sizes = [];
    this.Stock = [];
    if (this.small_ == true){
      this.Sizes.push("Small");
      this.Stock.push(this.qsmall);
    }
    if (this.medium_ == true){
        this.Sizes.push("Medium");
        this.Stock.push(this.qmedium);
    }
    if (this.large_ == true){
        this.Sizes.push("Large");
        this.Stock.push(this.qlarge);
    }
    if (this.xlarge_ == true){
      this.Sizes.push("XL");
      this.Stock.push(this.qxlarge);
    }
    if (this.xxlarge_ == true){
     this.Sizes.push("XXL");
     this.Stock.push(this.qxxlarge);
    }
    if (this.osfm_ == true){
        this.Sizes.push("One Size Fit Most");
        this.Stock.push(this.qosfm);
    }

    this.product.Name = this.Name;
    this.product.Description = this.Description;
    this.product.Price = this.Price;
    this.product.Details = this.Details;
    this.product.Fabric = this.Fabric;
    this.product.URL = this.newUrl;
    this.product.Sizes = this.Sizes;
    this.product.Stock = this.Stock;

    this.product.Collection = this.cis[this.cI];
    this.product.Category = "NONE";

    //console.log(this.Name);
    this.productService.addProduct(this.product);
  }

  checkUpdate(pName){
    this.loadItems();

    this.productService.findProduct(pName);

  }

  //file upload functions 

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    this.downloadURL = this.task.downloadURL(); 

    this.task.downloadURL().subscribe(s => this.newUrl = s).toString();

     this.snapshot = this.task.snapshotChanges().pipe(
    tap(snap => {
      if (snap.bytesTransferred === snap.totalBytes) {
        // Update firestore on completion
        this.db.collection('photos').add( { path, size: snap.totalBytes })
        /*this.db.collection('Clothing').add({
          'Name': this.product.Name, 
          'Price': this.product.Price, 
          'Details': this.product.Details, 
          'Fabric':this.product.Fabric, 
          'Information':this.product.Information, 
          'Sizes':this.product.Sizes, 
          'URL':this.newUrl
        });*/
      }
    })
  )
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
