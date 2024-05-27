import { Component, OnInit } from '@angular/core';
import { ListadoService } from './services/listado.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit
{
  listadoAhorcado : any[] = [];
  listadoMayorMenor : any[] = [];
  listadoPreguntados : any[] = [];
  listadoBuscaminas : any[] = [];

  constructor(private listado: ListadoService){}

  ngOnInit(): void 
  {
    this.listado.traerListado('ahorcado').then((data)=>{
      this.listadoAhorcado = data;
    });  

    this.listado.traerListado('mayor-menor').then((data)=>{
      this.listadoMayorMenor = data;
    });

    this.listado.traerListado('buscaminas').then((data)=>{
      this.listadoBuscaminas = data;
    });

    this.listado.traerListado('preguntados').then((data)=>{
      this.listadoPreguntados = data;
    }); 
  }
}
