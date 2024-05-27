import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from 'src/app/components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from 'src/app/components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from 'src/app/components/preguntados/preguntados.component';
import { BuscaminasComponent } from 'src/app/components/buscaminas/buscaminas.component';

const routes: Routes = [
  { path: '', component: JuegosComponent, children: [
    { path: 'ahorcado', component: AhorcadoComponent},
    { path: 'mayor-menor', component: MayorMenorComponent},
    { path: 'preguntados', component: PreguntadosComponent},
    { path: 'buscaminas', component: BuscaminasComponent} 
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
