import { Component } from '@angular/core';
import * as bedarf from './bedarf';
import { naehrwert } from './naehrwert';
import { Recipe, updateNutrients } from './recipe';
import { FoodSelector } from './food-selector';
import { NicePipe } from './pipe';
import { FormsModule } from '@angular/forms';
import { CoverageIndicator } from './coverage-indicator';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CoverageIndicator, FoodSelector, NicePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  recipe: Recipe = {
    amount: 1,
    unit: '',
    name: '',
    ingredients: [],
    nutrients: [],
  }
  days = 1;

  nutrientNames = naehrwert.header.nutrients as unknown as string[];

  bedarf = bedarf;

  constructor() {
    this.update();
  }

  update() {
    const r = this.recipe;
    const {ingredients} = r;
    if (ingredients.length == 0 || ingredients[ingredients.length - 1].food) {
      ingredients.push({} as any);
    }
    updateNutrients(this.recipe);
  }
}