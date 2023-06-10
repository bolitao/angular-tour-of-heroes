import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Hero} from "../hero";
import {HEROES} from "../mock-heroes";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  heroes: Hero[] = HEROES;
  selectedHero?: Hero = undefined;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
