import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadosRoutingModule } from './listados-routing.module';
import { ListadosComponent } from './listados.component';


@NgModule({
  declarations: [
    ListadosComponent
  ],
  imports: [
    CommonModule,
    ListadosRoutingModule
  ]
})
export class ListadosModule { }
