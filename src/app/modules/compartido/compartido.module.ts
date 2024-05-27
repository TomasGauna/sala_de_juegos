import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidoRoutingModule } from './compartido-routing.module';
import { CompartidoComponent } from './compartido.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompartidoComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    CompartidoRoutingModule,
    FormsModule
  ],
  exports: [
    ChatComponent
  ]
})
export class CompartidoModule { }
