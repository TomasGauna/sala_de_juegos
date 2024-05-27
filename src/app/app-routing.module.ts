import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'juegos', loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule) },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo:'home', pathMatch:'full' },
  //{ path: 'compartido', loadChildren: () => import('./modules/compartido/compartido.module').then(m => m.CompartidoModule) },
  { path: '**', redirectTo:'error', pathMatch:'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
