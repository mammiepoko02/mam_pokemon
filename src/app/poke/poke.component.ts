import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-poke',
  
  imports: [CommonModule],
  
  templateUrl: './poke.component.html',
  styleUrl: './poke.component.css'
})
export class PokeComponent {
  
  pokeListData:any[] = [];
  pokeSelect: any = null;
  showPokemons = false;
  showDetailPokemon: boolean[] =[] ;

  constructor(){
  }

  ngOnInit(): void{
    this.showAll()
  }
  showAll(){
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&amp;limit=151`).then(e=>{
      return e.json()
    }).then(e=>{
      console.log(e)
      this.pokeListData = e.results;
      this.showDetailPokemon = new Array(this.pokeListData.length).fill(false);

      this.pokeListData.forEach((pokemon, index) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((data) => {
            this.pokeListData[index].types = data.types.map((type: any) => type.type.name);
            this.pokeListData[index].stats = {
              hp: data.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat,
              attack: data.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat,
              defense: data.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat,
              specialAttack: data.stats.find((stat: any) => stat.stat.name === 'special-attack')?.base_stat,
              specialDefense: data.stats.find((stat: any) => stat.stat.name === 'special-defense')?.base_stat,
              speed: data.stats.find((stat: any) => stat.stat.name === 'speed')?.base_stat,
            };
          });
      });
    })
    .catch(error => console.error('Error fetching data :', error ));
  }

  statusDetail(index:number){
    this.showDetailPokemon[index] = !this.showDetailPokemon[index]
  }

  statusList(){
    this.showPokemons = !this.showPokemons;
  }

  showDetail(id:number){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(e=>{
      return e.json()
    }).then(e=>{
      console.log(e)
      this.pokeSelect = {
        name: e.name,
        frontImage: e.sprites.front_default,
        backImage: e.sprites.back_default,
        type: e.types.map((type: any)=> type.type.name),
        stats: {
          hp: e.stats.find((stat: any)=> stat.stat.name === 'hp')?.base_stat,
          attack: e.stats.find((stat: any)=> stat.stat.name === 'attack')?.base_stat,
          defense: e.stats.find((stat: any)=> stat.stat.name === 'defense')?.base_stat,
          specialAttack: e.stats.find((stat: any)=> stat.stat.name === 'special-attack')?.base_stat,
          specialDefense: e.stats.find((stat: any)=> stat.stat.name === 'special-defense')?.base_stat,
          speed: e.stats.find((stat: any)=> stat.stat.name === 'speed')?.base_stat,
        }
      };
    })
    .catch(error => console.error('Error fecthing data:',error));
  }

 /* cPokemon(index:number){
    const pokemon =  this.pokeListData[index];
    const pokemonId = pokemon.url.split('/')[6];
    this.showDetail(pokemonId);
  }
  */

}
