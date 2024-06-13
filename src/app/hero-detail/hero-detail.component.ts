import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
    hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute, // holds info about the route - we need this to extract the id 
    private heroService: HeroService,
    private location: Location // lets you navigate back to the previous view
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // get the id. ID will come back as stirng so cast to number. 
    this.heroService.getHero(id) // Pass in the ID from above and return an observable of the hero with that ID
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack)
    }
  }
}
