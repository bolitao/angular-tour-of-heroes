import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Hero} from "../hero";
import {HEROES} from "../mock-heroes";

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

  // hero = "Windstorm";
  // hero: Hero = {id: 1, name: "Windstorm"}

  heroes: Hero[] = HEROES;

  // selectedHero?: Hero = undefined;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
