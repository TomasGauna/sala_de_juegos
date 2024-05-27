import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListadoService } from 'src/app/modules/listados/services/listado.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit{
  cartas : any = [];
  startButtonText: string = 'Comenzar Juego';
  victory: boolean = false;
  activeGame: boolean = false;
  gameOver: boolean = false;
  sePuede = false;
  textGameOver: string = '¡PERDISTE!';
  cardsToGuess: any = [];
  score: number = 0;
  attempts: number = 10;
  currentCard: any = null;
  currentNumber: number = 0;
  currentIndex: number = 0;
  cardImage: string = '';
  toast = false;
  mensaje = '';

  constructor(private http: HttpClient, private auth: AuthService, private listado: ListadoService){}

  ngOnInit(): void {
    this.iniciarCartas();
  }

  iniciarCartas()
  {
    let promesa = this.http.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').toPromise();
    promesa.then((data:any)=>{
      console.log(data.deck_id)
      let ruta = 'https://www.deckofcardsapi.com/api/deck/' + data.deck_id + '/draw/?count=52';
      let promesa2 = this.http.get(ruta).toPromise();
      promesa2.then((data:any)=>{
        this.cartas = data.cards;
        console.log(this.cartas);
        this.sePuede = true;
      })
    });  
  }

  startGame() {
    if(this.sePuede)
    {
      this.attempts = 10;
      this.victory = false;
      this.activeGame = true;
      this.gameOver = false;
      this.textGameOver = '¡PERDISTE!';
      this.score = 0;
      this.currentIndex = 0;
      this.startButtonText = 'Reiniciar Juego';
      this.cartas.sort(() => Math.random() - 0.5);
      this.cardsToGuess = this.cartas.slice(0, 11);
      console.log(this.cardsToGuess);
      this.currentCard = this.cardsToGuess[this.currentIndex];
      
      this.currentNumber = this.currentCard.value == 'ACE' ? 1 : 
      this.currentCard.value == 'QUEEN' ? 12 :  
      this.currentCard.value == 'JACK' ? 11 : 
      this.currentCard.value == 'KING' ? 13 : this.currentCard.value;
      
      this.cardImage = this.currentCard.image;
      this.mensaje = 'Comiendo de partida';
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }
    else
    {
      this.mensaje = 'Cargado cartas...';
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }
  }

  playMayorMenor(mayorMenor: string) {
    const previousNumber: number = this.currentNumber;
    this.currentIndex++;
    this.attempts--;
    this.currentCard = this.cardsToGuess[this.currentIndex];
    this.currentNumber = this.currentCard.value == 'ACE' ? 1 : 
      this.currentCard.value == 'QUEEN' ? 12 :  
      this.currentCard.value == 'JACK' ? 11 : 
      this.currentCard.value == 'KING' ? 13 : this.currentCard.value;
    this.cardImage = this.currentCard.image;

    switch (mayorMenor) {
      case 'menor':
        if (previousNumber > this.currentNumber) 
        {
          this.score++;
          this.mensaje = 'Bien, es MENOR';
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        } else if (previousNumber === this.currentNumber) {
          this.mensaje = 'Casi, las cartas son iguales';
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        } else {
          this.mensaje = 'Le erraste che!!';
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }
        break;
      case 'mayor':
        if (previousNumber < this.currentNumber) {
          this.score++;
          this.mensaje = 'Bien, es MAYOR';
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        } else if (previousNumber === this.currentNumber) {
          this.mensaje = 'Casi, las cartas son iguales';
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        } else {
          this.mensaje = 'Le erraste che!!';
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }
        break;
    }

    if (this.currentIndex === 10) 
    {
      this.activeGame = false;
      this.gameOver = true;
      if (this.score >= 5) {
        this.victory = true;
        this.mensaje = '¡GANASTE!';
      } 
      else 
      {
        this.mensaje = 'Perdiste';
      }
      this.subirResultados();
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }
  } 

  subirResultados()
  {
    let obj = {usuario: this.auth.get_email(), puntaje: this.score, victoria: this.victory};
    
    this.listado.guardarResultado(obj, 'mayor-menor').then(()=>{
      this.mensaje = `Resultados subidos...`;
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }); 
  }
}
