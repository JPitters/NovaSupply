import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Clothes {
  Name: string;
  Price: string;
  Details: string;
  Fabric: string;
  Information: string;
  Sizes: string;
  URL:string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {

  clothesCol: AngularFirestoreCollection<Clothes>;
  Clothing: Observable<Clothes[]>;

  //clothes
  Name: string;
  Price: string;
  Details: string;
  Fabric: string;
  Information: string;
  Sizes: string;
  URL:string;
  
  constructor(private afs: AngularFirestore) {

  }
  
    ngOnInit() {
      this.clothesCol = this.afs.collection('Clothing');
      this.Clothing = this.clothesCol.valueChanges();

      

    }

    addItem() {
      this.afs.collection('Clothing').add({'Name': this.Name, 'Price': this.Price, 'Details': this.Details, 'Fabric':this.Fabric, 'Information':this.Information, 'Sizes':this.Sizes, 'URL':this.URL});
    
    }


    
}
