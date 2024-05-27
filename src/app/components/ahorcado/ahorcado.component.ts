import { Component } from '@angular/core';
import { ListadoService } from 'src/app/modules/listados/services/listado.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {
  toast = false;
  mensaje = '';
  user: any = null;
  buttonLetters: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  
  listOfWords: string[] = [
    'GUITARRA',
    'PIZZA',
    'AVION',
    'HELADO',
    'LIBRO',
    'TELEVISION',
    'COMPUTADORA',
    'CELULAR',
    'JARDIN',
    'CARRETERA',
    'MONTANA',
    'RIO',
    'PLAYA',
    'PINTURA',
    'RELOJ',
    'COCINA',
    'CIELO',
    'SOL',
    'LUNA',
    'ESTRELLA',
    'MONTANA',
    'FLORES',
    'ARCOIRIS',
    'CASCADA',
    'FOTOGRAFIA',
    'PIANO',
    'MONTANES',
    'GLOBO',
    'DINERO',
    'PAPEL',
    'CERVEZA',
    'VINO',
    'ESPEJO',
    'VENTANA',
    'LLAVE',
    'PLANTA',
    'CANCION',
    'CAMINO',
    'CASCARON'
];

  victory: boolean = false;
  activeGame: boolean = true;
  attempts: number = 6;
  score: number = 0;
  image: number | any = 0;
  word: string = '';
  hyphenatedWord: string[] = [];

  constructor(private auth: AuthService, private listado: ListadoService) 
  {
    this.word = this.listOfWords[
        Math.round(Math.random() * (this.listOfWords.length - 1))
      ];
    this.hyphenatedWord = Array(this.word.length).fill('_');
  }

  restartGame() 
  {
    this.word = this.listOfWords[Math.round(Math.random() * (this.listOfWords.length - 1))];
    this.hyphenatedWord = Array(this.word.length).fill('_');
    this.activeGame = true;
    this.attempts = 6;
    this.score = 0;
    this.image = 0;
    this.victory = false;
    this.resetClassBotones();

    this.mensaje = 'Reiniciando partida...';
    this.toast = true;
    setTimeout(() => {
      this.toast = false;
    }, 3000);
  }

  resetClassBotones(){
    for (let index = 0; index < this.buttonLetters.length; index++) {
      const elemento = document.getElementById("boton"+index) as HTMLButtonElement;
      elemento?.classList.remove("btn-error");
      elemento?.classList.remove("btn-acierto");
      elemento?.classList.add("btn-letra");
      if(elemento!=null)
      {
        elemento.disabled = false;
      }

    }
  }

  sendLetter(letter: string, idDelBoton:number) 
  {
    let letterFlag: boolean = false;
    let winGame: boolean = false;

    if (this.activeGame) {
      const alreadyGuessedLetterFlag: boolean = this.hyphenatedWord.some(
        (c) => c === letter
      );
      for (let i = 0; i < this.word.length; i++) {
        const wordLetter = this.word[i];
        if (wordLetter === letter && !alreadyGuessedLetterFlag) {
          this.hyphenatedWord[i] = letter;
          letterFlag = true;
          this.score++;
          winGame = this.hyphenatedWord.some((hyphen) => hyphen == '_');
          if (!winGame) {
            this.image = this.image + '_v';
            this.activeGame = false;
            this.victory = true;

            this.mensaje = 'Ganaste';
            this.toast = true;
            setTimeout(() => {
              this.toast = false;
            }, 2000);
            this.subirResultados();
            break;
          }
        }
      }

      if (!letterFlag && !alreadyGuessedLetterFlag) 
      {
        if (this.attempts > 0) 
        {
          this.attempts--;
          this.image++;
          
          this.mensaje = 'Erraste che';
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
          const elemento = document.getElementById("boton"+idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-error");
          if(elemento!=null)
          {
            elemento.disabled = true;
          }
          if (this.attempts === 0) {
            this.mensaje = `La palabra era: ${this.word}. Mejor suerte la proxima. Perdiste.`;
            this.toast = true;
            setTimeout(() => {
              this.toast = false;
            }, 5000);
            this.activeGame = false;
            this.subirResultados();
          }
        }

        if (this.score > 0) {
          this.score--;
        }
      } 
      else if (alreadyGuessedLetterFlag) 
      {
        this.mensaje = `Esta letra ya fue utilizada`;
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 3000);
        this.activeGame = false;
      } 
      else if (letterFlag) 
      {
        if(!this.victory) {
          this.mensaje = `Le pegaste`;
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
          const elemento = document.getElementById("boton"+idDelBoton) as HTMLButtonElement;
          elemento?.classList.remove("btn-letra");
          elemento?.classList.add("btn-acierto");
          if(elemento!=null)
          {
            elemento.disabled = true;
          }
        }
      }
    } 
    else 
    {
      this.mensaje = `Le pegaste`;
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }
  } 

  subirResultados()
  {
    let obj = {usuario: this.auth.get_email(), puntaje: this.score, victoria: this.victory};
    
    this.listado.guardarResultado(obj, 'ahorcado').then(()=>{
      this.mensaje = `Resultados subidos...`;
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }); 
  }
}
