import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ShopComponent } from './shop/shop.component';


import { ProductService } from './services/product.service'


import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
//import {AppRoutingModule} from './app-routing.module';

//For Firebase
import { environment } from '../environments/environment'
import { AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemComponent } from './item/item.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserInfoComponent} from './user-info/user-info.component';
import { CartComponent } from './cart/cart.component';

import {AuthService} from './auth.service';

import {UserService} from './services/user.service';


import { AngularFireStorageModule } from 'angularfire2/storage';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';

import {HttpClientModule} from '@angular/common/http';
import { GalleryComponent } from './gallery/gallery.component';
import { CollectService } from './services/collect.service';
import { NvgalleryComponent } from './nvgallery/nvgallery.component';


const appRoutes: Routes = [
  {path:'', component:IndexComponent},
  {path:'shop', component:ShopComponent},
  {path:'form', component:FormComponent},
  {path:'item', component:ItemComponent},
  {path:'add', component:AddItemComponent},
  {path:'login', component:UserLoginComponent},
  {path:'user', component: UserInfoComponent},
  {path:'cart', component:CartComponent},
  {path:'gallery', component:GalleryComponent},
  {path:'nvgallery', component:NvgalleryComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ShopComponent,
    FormComponent,
    NavbarComponent,
    AddItemComponent,
    ItemComponent,
    UserLoginComponent,
    UserInfoComponent,
    CartComponent,
    DropZoneDirective,
    FileSizePipe,
    GalleryComponent,
    NvgalleryComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'NovaSupply'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [ProductService, AuthService, UserService, CollectService],
  bootstrap: [AppComponent]
})

export class AppModule { }
