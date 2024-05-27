import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit{
  git:string = "https://api.github.com/users/TomasGauna";
  perfil:any;
  explicacion = '';

  constructor(private http: HttpClient){}

  ngOnInit()
  {
    this.http.get(this.git).subscribe((res:any) => this.perfil = res);
    this.explicacion = "El juego 'Evitando minas', despejar la cantidad exigida de cuadritos, sin encontrarse con una mina. En caso de pisar o tocar una mina, explotará y, por ende, terminará el juego."
  }
}
