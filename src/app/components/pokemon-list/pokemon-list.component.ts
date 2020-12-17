import { Component, OnInit } from '@angular/core';
import { GetPokemonService } from 'src/app/services/get-pokemon/get-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  pokemonsObj: any;
  isLoading: boolean;

  constructor(public pokemonService: GetPokemonService) { }

  async getPokemonData() {
    try {
      this.isLoading = true
      let getPokemons = await this.pokemonService.getAllPokemons()
      this.pokemonsObj = getPokemons.apiData;
      this.pokemons = getPokemons.pokemons;
      this.isLoading = false
    } catch(e) {
      console.log(e)
    }
  }

  async goToPage(url) {
    try {
      if(url) {
        this.isLoading = true
        let getPokemons = await this.pokemonService.getAllPokemons(url)
        this.pokemonsObj = getPokemons.apiData;
        this.pokemons = getPokemons.pokemons;
        this.isLoading = false
      }
    } catch(e) {
      console.log(e)
    }
  }

  ngOnInit(): void {
    this.getPokemonData();
  }

}
