import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form : any;
  formValido = true;
  correo = '';
  password = '';
  mensajeError = '';

  constructor(private auth: AuthService, private router: Router, form: FormBuilder, private firestore: Firestore)
  {
    this.form = form.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ingresar()
  {
    if(this.form.valid)
    {
      this.auth.login(this.correo, this.password)
      ?.then(response =>
      {
        FirestoreService.guardarFs('logsUsuarios', this.correo, this.firestore);
        this.correo = '';
        this.password = '';

        setTimeout(()=>{
          this.router.navigate(['/home']);
        }, 1500);
      })
      .catch(error =>
      {
        console.log(error);
        this.formValido = false;
        switch(error.code)
        {
          case 'auth/invalid-email':
            this.mensajeError =  "Correo inválido.";
          break;
          case 'auth/missing-password':
            this.mensajeError = "Contraseña inválida.";
          break;
          case 'auth/invalid-login-credentials':
            this.mensajeError = 'Correo y/o contraseña incorrectos.';
          break;
        }    

        setTimeout(()=>{
          this.formValido = true;
        }, 3000);
      });
    }
    else
    {
      this.formValido = false;
      this.mensajeError = 'Complete los campos correctamente.';
      setTimeout(()=>{
        this.formValido = true;
      }, 1500);
    }
  }

  cambiarSeleccion(usuarioElegido: string)
  {
    switch(usuarioElegido)
    {
      case 'admin':
        this.correo = 'admin@admin.com';
        this.password = '111111'; 
      break;
      case 'invitado':
        this.correo = 'invitado@invitado.com';
        this.password = '222222'; 
      break;
      case 'usuario':
        this.correo = 'usuario@usuario.com';
        this.password = '333333'; 
      break;
      case 'anonimo':
        this.correo = 'anonimo@anonimo.com';
        this.password = '444444'; 
      break;
      case 'tester':
        this.correo = 'tester@tester.com';
        this.password = '555555'; 
      break;
      case 'ninguno':
        this.correo = '';
        this.password = ''; 
      break;
    }
  }
}
