import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { CompartidoModule } from '../compartido/compartido.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    CompartidoModule,
    HttpClientModule
  ]
})
export class HomeModule { }
