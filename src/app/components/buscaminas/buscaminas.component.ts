import { Component, OnInit } from '@angular/core';
import { ListadoService } from 'src/app/modules/listados/services/listado.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buscaminas',
  templateUrl: './buscaminas.component.html',
  styleUrls: ['./buscaminas.component.scss']
})
export class BuscaminasComponent implements OnInit{
  rows = 8; // Número de filas
  cols = 8; // Número de columnas
  mines = 5; // Número de minas
  restantes = 20;
  activo = false;
  score = 0;
  terminado = false;
  toast = false;
  mensaje = '';

  board: any[][] = [];
  gameover: boolean = false;

  constructor(private auth: AuthService, private listado: ListadoService)
  {

  }

  ngOnInit() {
  }

  comenzarJuego() {
    this.activo = true;
    this.board = [];

    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push({ revealed: false, hasMine: false });
      }
      this.board.push(row);
    }

    for (let i = 0; i < this.mines; i++) {
      let randomRow = Math.floor(Math.random() * this.rows);
      let randomCol = Math.floor(Math.random() * this.cols);
      this.board[randomRow][randomCol].hasMine = true;
    }

    this.mensaje = 'Comenzando...';
    this.toast = true;
    setTimeout(() => {
      this.toast = false;
    }, 3000);
  }

  revealCell(row: number, col: number) {
    if (this.gameover || this.board[row][col].revealed) {
      return;
    }

    this.board[row][col].revealed = true;

    if (this.board[row][col].hasMine) {
      this.gameover = true;
      this.terminado = true;
      this.mensaje = 'PERDISTE';
      this.subirResultados();
    }
    else
    {
      this.restantes--;
      this.score+=5;
      this.mensaje = 'Safaste';

      if(this.restantes === 0)
      {
        this.subirResultados();
        this.terminado = true;
        this.gameover = true;
        this.mensaje = 'GANASTE';
      }
    }

    
    this.toast = true;
    setTimeout(() => {
      this.toast = false;
    }, 1500);
  }

  reiniciar()
  {
    this.terminado = false;
    this.gameover = false;
    this.restantes = 20;
    this.score = 0;
    this.comenzarJuego();

    this.mensaje = 'Reiniciando...';
    this.toast = true;
    setTimeout(() => {
      this.toast = false;
    }, 3000);
  }

  subirResultados()
  {
    let obj = {usuario: this.auth.get_email(), puntaje: this.score, victoria: !this.gameover};
    
    this.listado.guardarResultado(obj, 'buscaminas').then(()=>{
      this.mensaje = `Resultados subidos...`;
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }); 
  }
}
