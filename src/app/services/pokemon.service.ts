import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService{
  static rutaPokemons = 'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0'

  constructor(private http: HttpClient) { }

  traerPokemones(): Observable<any>
  {
    return this.http.get(PokemonService.rutaPokemons);
  }
}
