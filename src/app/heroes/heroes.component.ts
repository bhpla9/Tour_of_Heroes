import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
// import { CommonModule } from '@angular/common';
import { HeroService } from '../hero.service';
import { MessageService } from '../../message.service';

@Component({ // Decorator contains metadata about component -- standalone=true would be here for Ang17
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {

//   selectedHero?: Hero;
//   onSelect(hero: Hero): void {
//     this.messageService.add(`You selected Hero with an ID of ${hero.id} and name ${hero.name}`)
//     this.selectedHero = hero;
// }
  
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}


// Observables let us wait for the data and listen for the response. 