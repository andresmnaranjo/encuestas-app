import { NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FolderPageRoutingModule } from './folder-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { FolderPage } from './folder.page';
import { SearchPipe } from '../search.pipe';

import { IonicSelectableModule } from 'ionic-selectable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccordionModule } from '../accordion/accordion.module';

import { LongPressModule } from 'ionic-long-press';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    FolderPageRoutingModule,
    IonicSelectableModule,
    NgxDatatableModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    LongPressModule,
    IonicStorageModule.forRoot(),
  ], providers: [
    FormControl,
  ],
  declarations: [FolderPage, SearchPipe]
})
export class FolderPageModule { }
