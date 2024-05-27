import { Component, OnInit } from '@angular/core';
import { Firestore, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit{
  nombre = '';
  apellido = '';
  edad = '';
  telefono = '';
  vecesJugadas = '';
  mensaje = '';
  toast = false;
  opciones: any[] = [];
  checks: any[] = [];

  constructor(private firestore: Firestore, private auth: AuthService, private router: Router){}
  
  ngOnInit(): void {
    console.log(document.getElementById('opcion1'))
  }

  enviar()
  {
    if(this.validarTexto(this.nombre) && this.nombre != null)
    {
      if(this.validarTexto(this.apellido) && this.apellido != null)
      {
        if(this.validarEdad() && this.edad != null)
        {
          if(this.validarTelefono() && this.telefono != null)
          {
            if(this.vecesJugadas != null)
            {
              if(this.validarRadioButtons())
              {
                this.cargarChecks();
                let seleccionado =  this.opciones.map((radio:any) => (radio as HTMLInputElement).value);
                let seleccionados =  this.checks.map((radio:any) => (radio as HTMLInputElement).value);
                let obj = {nombre:this.nombre, apellido: this.apellido, edad: this.edad, telefono: this.telefono, puntaje: seleccionado.values, juegosElegidos: seleccionados.values}; 
                FirestoreService.guardarFs('encuestas', this.auth.get_email(), this.firestore, '', JSON.stringify(obj));
                this.mensaje = 'Encuesta enviada correctamente';
              }
              else
              {
                this.mensaje = 'Debe elegir al menos una opcion de puntaje';
              }
            }
            else
            {
              this.mensaje = 'Debe ingresar un numero de veces jugadas';
            }
          }
          else
          {
            this.mensaje = 'Telefono invalido';
          }
        }
        else
        {
          this.mensaje = 'Edad invalida';
        }
      }
      else
      {
        this.mensaje = 'Apellido invalido';
      }
    }
    else
    {
      this.mensaje = 'Nombre invalido';
    }

    this.toast = true;
    setTimeout(()=>{
      this.toast = false;
      this.mensaje = '';
    }, 3000);
  }

  validarEdad() 
  {
    let ret = true;

    const edad = parseInt(this.edad, 10);
    if (edad < 18 || edad > 99 || isNaN(edad)) 
    {
      ret = false;
      //this.mensaje = "La edad debe estar entre 18 y 99 años.";
    }

    return ret;
  }

  validarTelefono() 
  {
    let ret = true;

    if (this.telefono.length !== 10 || isNaN(parseInt(this.telefono, 10))) 
    {
      ret = false;
    }

    return ret;
  }

  validarTexto(texto:string) 
  {
    let ret = true;
    const soloLetras = /^[A-Za-z]+$/;

    if (!soloLetras.test(texto)) 
    {
      ret = false;
    }

    return ret;
  }

  validarRadioButtons() 
  {
    this.opciones.push(document.getElementById('opcion1'));
    this.opciones.push(document.getElementById('opcion2'));
    this.opciones.push(document.getElementById('opcion3'));
    let alMenosUnoSeleccionado = false;

    this.opciones.forEach((opcion:any)=> 
    {
      if (opcion.checked) 
      {
          alMenosUnoSeleccionado = true;
      }
    });

    return alMenosUnoSeleccionado;
  }

  cargarChecks() 
  {
    this.checks.push(document.getElementById('op1'));
    this.checks.push(document.getElementById('op2'));
    this.checks.push(document.getElementById('op3'));
    this.checks.push(document.getElementById('op4'));
  }
}
