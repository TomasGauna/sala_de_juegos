import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompartidoComponent } from './compartido.component';

const routes: Routes = [{ path: '', component: CompartidoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompartidoRoutingModule { }
