import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
// import { CommonModule } from '@angular/common';
import { HeroService } from '../hero.service';
import { MessageService } from '../../message.service';

@Component({ // Decorator contains metadata about component -- standalone=true would be here for Ang17
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit { // Use OnInit for initiliasation
  
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {} // Constructors used to inject dependencies, such as services, into the component

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  } // Subscribing to an observable means you are interested in the values emitted by the observable - you pass in a call-back function to define what to do with the data

  add(name: string): void {
    name = name.trim();
    if (!name) { return; } // If name is an empty string, the method returns early without doing anything further - prevents adding a hero with an empty name
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); // Filter the array to exclude hero to be deleted 
    this.heroService.deleteHero(hero.id).subscribe(); // deleteHero method returns an observable so we need to subscribe to it
  }

  ngOnInit(): void { // ngOnInit = lifecycle hook - called after constructor is called and component has been initiiased. Used to perform any additional initialisation required.
    this.getHeroes();
  }
}

// Let Angular call ngOnInit() after constructing a HeroesComponent instance.


// Observables let us wait for the data and listen for the response. 
// The .subscribe method represents the execution of an Observable - we must subscribe to the observable for the observable to emit data

// With OnInit, OnDestroy can be added to unsubscribe from the subscription: 

// The constructor shouldn't do anything - it should be reserved for minimal initialisation such as wiring constructor params to properties.