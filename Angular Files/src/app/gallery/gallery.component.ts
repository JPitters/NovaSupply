import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CollectService } from '../services/collect.service';
import { CollectionInt } from '../models/collect';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  items: CollectionInt[];
  constructor(private collectService: CollectService) { }

  ngOnInit() {
    this.getAllItems();
  }

  private getAllItems(){
    this.collectService.getAllCollect().subscribe(items => {
      this.items = items;
    });
  }

  toGallery(item){
    localStorage['galleryID'] = item.Name;
  }
}
