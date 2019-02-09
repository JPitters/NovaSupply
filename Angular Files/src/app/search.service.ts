import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';


@Injectable()
export class SearchService {

  constructor(private db: AngularFireDatabase) { }

  getSearch(start, end): FirebaseListObservable<any>{
    return this.db.list('/Clothing' , {
      query: {
        orderByChild: 'Name',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });
  }

}
