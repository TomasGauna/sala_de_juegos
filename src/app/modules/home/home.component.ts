import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  logueado = false;
  email = this.auth.get_email();
  isChatOpen = false;
  error = false;
  mensajeError = '';
  
  constructor(private auth: AuthService, private router: Router){}

  ngOnInit()
  {
    if(this.email != '')
    {
      this.logueado = true;
    }
  }

  cerrarSesion()
  {
    this.auth.logout()?.then(()=>{
      this.logueado = false;
      this.email = '';
      this.isChatOpen = false;
    })
    .catch((error)=>{
      console.error("Error al desloguearse: ", error)
    });
  }

  irHacia(path: string)
  {
    if(!this.logueado)
    {
      this.mensajeError = 'Debe estar logueado para ingresar a esta sección';
      this.error = true;
      setTimeout(() => {
        this.error = false;
        this.mensajeError = '';
      }, 3000);
    }
    else
    {
      this.router.navigate([`${path}`]);
    }
  }

  abrirChat()
  {
    if(this.email)
    {
      this.isChatOpen = !this.isChatOpen;
    }
  }
}
