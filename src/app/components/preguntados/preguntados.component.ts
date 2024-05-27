import { Component, OnInit } from '@angular/core';
import { ListadoService } from 'src/app/modules/listados/services/listado.service';
import { AuthService } from 'src/app/services/auth.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit{
  pokemones: any[] = [];
  pokemonesEnJuego: any[] = [];
  pokemonCorrecto:any;
  intentos = 10;
  score = 0;
  activo = false;
  toast = false;
  sePuede = false;
  victory = false;
  mensaje = '';
  rutaImagen = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/?.png';

  constructor(private pokemonService: PokemonService, private auth: AuthService, private listado: ListadoService){}

  ngOnInit() {
    let promesa = this.pokemonService.traerPokemones().toPromise();
    promesa.then((data)=>{
      let pokemones = data.results;
      for(let i = 0; i < pokemones.length; i++)
      {
        this.pokemones.push({name: pokemones[i].name, foto: this.rutaImagen.replace('?', `${data.results[i].url.split("/")[6]}`)});
      }
      console.log(this.pokemones);
    });
  }

  comenzarJuego()
  {
    this.activo = true;
    this.sePuede = true;
    this.pokemonesEnJuego = this.pokemones.sort(() => Math.random() - 0.5);
    this.pokemonesEnJuego = this.pokemonesEnJuego.slice(0,5);
    this.pokemonCorrecto = this.pokemonesEnJuego.slice().sort(() => 0.5 - Math.random())[0];
  }

  elegirPokemon(p:any)
  {
    if(this.sePuede)
    {
      if(this.pokemonCorrecto.name === p.name)
      {
        this.mensaje = 'Le pegaste';
        this.score++;
      }
      else
      {
        this.mensaje = 'Le erraste che';
      }

      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);

      this.intentos--;
      
      if(this.intentos > 0)
      {
        this.comenzarJuego();
      }
      else
      {
        if(this.score > 4)
        {
          this.mensaje = 'GANASTE!';
          this.victory = true;
        }
        else
        {
          this.mensaje = 'PERDISTE!';
        }

        this.subirResultados();
        this.sePuede = false;
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 3000);
      }
    }
  }

  reiniciar()
  {
    this.pokemonesEnJuego = [];
    this.pokemonCorrecto = {};
    this.intentos = 10;
    this.score = 0;
    this.mensaje = 'Reiniciando...';
    this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    this.comenzarJuego();
  }

  subirResultados()
  {
    let obj = {usuario: this.auth.get_email(), puntaje: this.score, victoria: this.victory};
    
    this.listado.guardarResultado(obj, 'preguntados').then(()=>{
      this.mensaje = `Resultados subidos...`;
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }); 
  }
}
