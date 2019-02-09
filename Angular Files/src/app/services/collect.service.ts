import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CollectionInt } from '../models/collect';

@Injectable()
export class CollectService {
  private collCollection: AngularFirestoreCollection<CollectionInt>;
  obvColls: Observable<CollectionInt[]>;
  obvColl: Observable<CollectionInt>;
  collectDoc: AngularFirestoreDocument<CollectionInt>;

  constructor(public afs: AngularFirestore) {
    this.loadCollection();
    this.loadColls(); 
   }

   private loadCollection(){ this.collCollection = this.afs.collection('CollectionInt'); }

   private loadColls(){
    //get all documents from the collection throught the snapshot, making the document ID obtainable
    this.obvColls = this.collCollection.snapshotChanges().map(changes => { 
      return changes.map(a => {
        const data = a.payload.doc.data() as CollectionInt;
        data.Name = a.payload.doc.id;
        return data;
      });
    });
  }

  getAllCollect(){
    return this.obvColls;
  }

  getCollect(cName){
    this.collectDoc = this.afs.doc(`CollectionInt/${cName}`);
    this.obvColl = this.collectDoc.valueChanges();
    return this.obvColl;
  }

  //Make Admin only
  addCollect(item: CollectionInt){
    this.collCollection.add({
      'Name': item.Name, 
      'pID': item.pID,
      'URL': item.URL
    });
  }

  //Make Admin only
  deleteItem(item: CollectionInt){
    this.collectDoc = this.afs.doc(`Clothing/${item.Name}`);
    this.collectDoc.delete();
  }
}
