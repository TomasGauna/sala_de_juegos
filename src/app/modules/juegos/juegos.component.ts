import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit { 
  mostrarComponentes = true;
  logueado = false;
  email = this.auth.get_email();
  isChatOpen = false;
  
  constructor(private auth: AuthService, private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/juegos/ahorcado' || event.url === '/juegos/mayor-menor' || event.url === '/juegos/preguntados' || event.url === '/juegos/buscaminas') {
          this.mostrarComponentes = false;
        } else {
          this.mostrarComponentes = true;
        }
      }
    });
  }


  ngOnInit() {
    if(this.email != '')
    {
      this.logueado = true;
    }
    else
    {
      this.router.navigateByUrl('home');
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

  abrirChat()
  {
    if(this.email)
    {
      this.isChatOpen = !this.isChatOpen;
    }
  }
}
