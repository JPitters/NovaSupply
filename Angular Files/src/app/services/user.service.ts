import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User, CartItem, Order } from '../models/user';
import { AuthService } from '../auth.service';

@Injectable()
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  private orderCollection: AngularFirestoreCollection<Order>;
  private userDoc: AngularFirestoreDocument<User>;
  obUsers_: Observable<User[]>;
  obUser_: Observable<User>;
  userID_: String;
  admin_: boolean;
  userInfo_: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:"", bAddress:"", bCity:"", bProvince:"", bCountry:"", bPostalCode:"", bPhoneNumber:"", Cart:[], admin: false};
 // userCart_: Cart = { Quantity:[], Name:[], Size:[] };

  UserState: any = null;
  adminState: any = null;

  constructor( public afs: AngularFirestore, public authService: AuthService) {
    this.loadCollection();
   }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //Getting Data from database
  //This function gets the collection from the database
  private loadCollection(){ this.userCollection = this.afs.collection('Users'); }
  
  private loadUsers(){
    //get all user documents from the collection throught the snapshot, making the document ID obtainable
    this.obUsers_ = this.userCollection.snapshotChanges().map(changes => { 
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  
    //this.obvProds = this.afs.collection('Users').valueChanges(); //ValueChanges returns as Observable only (use snapShot for id) 
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //Adding a user
  addUser(user: User, UID){
    this.userCollection.doc(UID).set({
      'FirstName': user.FirstName,
      'Email': user.Email,
      'LastName': user.LastName,
      'Address': user.Address,
      'City': user.City,
      'Province': user.Province,
      'Country': user.Country,
      'PostalCode': user.PostalCode,
      'PhoneNumber': user.PhoneNumber,
      'bAddress': user.bAddress,
      'bCity': user.bCity,
      'bProvince': user.bProvince,
      'bCountry': user.bCountry,
      'bPostalCode': user.bPostalCode,
      'bPhoneNumber': user.bPhoneNumber,
      'Cart': user.Cart,
      'admin': user.admin
    });
  }

  //adds the cart object to the user document
  addCart(cart: Array<CartItem>, UID){
    this.userCollection.doc(UID).set({
      'Cart': cart
    }, { merge: true });
  }
 
  //Edit User profile
  editUser(user: User, UID){
    this.userDoc = this.afs.doc(`Users/${UID}`);
    this.userDoc.update(user);
  }

  //Getting User information
  getUser(e){
    this.userDoc = this.afs.doc(`Users/${e}`);
    this.obUser_ = this.userDoc.valueChanges();
    return this.obUser_;
  }

  addOrder(order: Order){
    this.orderCollection = this.afs.collection('Orders');
    this.orderCollection.add({
      'uid': order.uid,
      'Status': order.Status,
      'Done': order.Done,
      'OItems': order.OItems
    });
  }
/*
  getAdmin() {
    return new Promise((resolve) => {
      this.getUser(this.authService.currentUserName).subscribe(user => {
        this.admin_ = user.admin;
        resolve();
      });
    });
  }

  get isUserAdmin(): boolean {
    //this.getAdmin();
    if (this.admin_ == true) {
      return true
    } else {
      return false
    }
    
  }
  */
}
