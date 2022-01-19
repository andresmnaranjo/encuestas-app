import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionComponent} from './accordion.component';
@NgModule({
  declarations: [AccordionComponent],
  exports: [AccordionComponent],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccordionModule { }
