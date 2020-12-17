import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPokemonService {
  pokemonsObj: any;
  pokemons: any[];

  constructor() { }

  async getAllPokemons(url = null) {
    try {
      let newUrl = url ?? 'https://pokeapi.co/api/v2/pokemon';
      let pokemonList = await fetch(newUrl)
      this.pokemonsObj = await pokemonList.json()

      return { 
        apiData: this.pokemonsObj,
        pokemons: await this.getPokemonDetails(this.pokemonsObj.results)
      };
    } catch(e) {
      console.log(e)
    }
  }

  async getPokemonDetails(pokemonArray: any[]) {
    try {
      let pokemons = await Promise.all(pokemonArray.map(async pokemon => {
        let getPokemon = await fetch(pokemon.url)
        let pokemonObj = await getPokemon.json() 
        return pokemonObj
      }))
      this.pokemons = pokemons.filter(Boolean)
      return this.pokemons
    } catch(e) {
      console.log(e)
    }
  }

  async getSinglePokemonDetail(id) {
    try {
      let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      return pokemon.json()
    } catch(e) {
      console.log(e)
    }
  }

}
