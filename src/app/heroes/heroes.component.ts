import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Hero} from "../hero";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  heroes: Hero[] = [];
  selectedHero ?: Hero = undefined;

  onSelect(hero: Hero):
    void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    let observable = this.heroService.getHeroes();
    observable.subscribe(data => this.heroes = data);
  }
}
