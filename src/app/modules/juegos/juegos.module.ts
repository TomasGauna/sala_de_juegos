import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { HttpClientModule } from '@angular/common/http';
import { CompartidoModule } from '../compartido/compartido.module';
import { PokemonService } from 'src/app/services/pokemon.service';


@NgModule({
  declarations: [
    JuegosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HttpClientModule,
    CompartidoModule
  ],
  providers: [PokemonService],
})
export class JuegosModule { }
