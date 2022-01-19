import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoaderService } from '../loader.service';
import { SearchPipe } from '../search.pipe';
import { IonicModule } from '@ionic/angular';
import { EncuestasComponent } from '../encuestas/encuestas.component';
import { IonicStorageModule } from '@ionic/storage';
import { SwiperModule } from 'swiper/angular';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EncuestasComponent
  }
];

@NgModule({
  declarations: [EncuestasComponent, SearchPipe],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild(routes),
    SwiperModule
  ], providers: [
    FormControl,
    LoaderService,
  ]
})
export class EncuestaModule { }
