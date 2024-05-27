import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuienSoyComponent } from 'src/app/components/quien-soy/quien-soy.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { EncuestaComponent } from 'src/app/components/encuesta/encuesta.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children:[
    { path: 'quien-soy', component:QuienSoyComponent},
    { path: 'listados', loadChildren: () => import('../listados/listados.module').then(m => m.ListadosModule) },
    { path: 'encuesta', component:EncuestaComponent},
  ]},
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo:'error', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
