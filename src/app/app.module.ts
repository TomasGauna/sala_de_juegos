import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RegistroComponent } from './components/registro/registro.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { BuscaminasComponent } from './components/buscaminas/buscaminas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    QuienSoyComponent,
    RegistroComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    BuscaminasComponent,
    EncuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
