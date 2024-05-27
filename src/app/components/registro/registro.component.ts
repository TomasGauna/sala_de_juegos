import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  form : any;
  formValido = true;
  correo = '';
  password = '';
  Rpassword = '';
  mensajeError = '';

  constructor(private auth: AuthService, private router: Router, form: FormBuilder, private firestore: Firestore)
  {
    this.form = form.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      Rpassword: ['', Validators.required]
    });
  }

  ingresar()
  {
    if(this.form.valid && this.password === this.Rpassword)
    {
      this.auth.signup(this.correo, this.password)
      ?.then(() =>
      {
        FirestoreService.guardarFs('logsUsuarios', this.correo, this.firestore);
        setTimeout(()=>{
        this.auth.login(this.correo, this.password)?.then(()=>{
          this.router.navigate(['/home']);
          this.correo = '';
          this.password = '';
          this.Rpassword = '';
          });
        }, 2000);
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
          case 'auth/email-already-in-use':
            this.mensajeError = 'El correo ya se encuentra en uso.'
          break;
        }    

        setTimeout(()=>{
          this.formValido = true;
        }, 3000);
      });
    }
    else
    {
      this.mensajeError = 'Complete los campos correctamente.';
      
      if(this.password !== this.Rpassword)
      {
        this.mensajeError = 'Las contraseñas no coinciden.';
      }
      this.formValido = false;
      setTimeout(()=>{
        this.formValido = true;
        this.mensajeError = '';
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
