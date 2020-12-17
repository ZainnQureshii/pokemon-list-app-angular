import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetPokemonService } from 'src/app/services/get-pokemon/get-pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  isLoading: boolean;

  constructor(public pokemonService: GetPokemonService, public router: Router) { }

  async getPokemonDetail(id) {
    try {
      this.isLoading = true;
      this.pokemon = await this.pokemonService.getSinglePokemonDetail(id)
      let evolutionChain = await this.getEvolutionChain(this.pokemon.species.url)
      this.pokemon.evolutionChain = evolutionChain
      this.isLoading = false;
    } catch(e) {
      console.log(e)
    } 
  }

  async getEvolutionChain(url) {
    try {
      let species = await fetch(url)
      let evolutionChain: any = await fetch((await species.json()).evolution_chain.url)
      evolutionChain = await evolutionChain.json()
      let chainArray = []
      const combineEvolutionChain = (chainObj) => {
        const addChain = (chain) => {
          chainArray.push(chain.species.name)
          if(chain.evolves_to.length > 0) {
            addChain(chain.evolves_to[0])    
          }
        }
        addChain(chainObj)
      }
      combineEvolutionChain(evolutionChain.chain)
      return chainArray
    } catch(e) {
      console.log(e)
    } 
  }

  ngOnInit(): void {
    let url = this.router.url
    let pokemonId = parseInt(url.split('/').pop());
    this.getPokemonDetail(pokemonId);
  }

}
