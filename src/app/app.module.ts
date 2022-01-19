import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { IonicSelectableModule } from 'ionic-selectable';

import { MypopComponent } from "./popovers/mypop/mypop.component";

import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { FolderPage } from './folder/folder.page';

@NgModule({
  declarations: [AppComponent, MypopComponent],
  entryComponents: [MypopComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicSelectableModule,
    IonicStorageModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FolderPage,
    AndroidFingerprintAuth,
    StatusBar,
    SplashScreen,
    HTTP,
    Vibration,
    Push,
    FormControl,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }