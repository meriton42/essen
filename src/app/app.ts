import { Component } from '@angular/core';
import { Recipe, updateNutrients } from './recipe';
import { FoodSelector } from './food-selector';
import { NicePipe } from './pipe';
import { FormsModule } from '@angular/forms';
import { CoverageIndicator } from './coverage-indicator';
import { drv, Nutrient } from './bedarf';
import { naehrwert } from './naehrwert';

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

  needs: {
    min?: number,
    max?: number
  }[] = [];

  nutrientNames = naehrwert.header.nutrients as unknown as Nutrient[]; // we take it from there so it has the same order as recipe.nutrients

  constructor() {
    this.update();
  }

  largestValue: number[] = [];

  update() {
    const r = this.recipe;
    const {ingredients} = r;
    if (ingredients.length == 0 || ingredients[ingredients.length - 1].food) {
      ingredients.push({} as any);
    }
    updateNutrients(r);
    this.needs = this.nutrientNames.map(n => {
      let {min, max} = drv[n];
      return {
        min: min ? min * this.days : undefined,
        max: max ? max * this.days : undefined,
      }
    })
    this.largestValue = r.nutrients.map((v, i) => {
      const {min, max} = this.needs[i];
      return Math.max(...[v, min, max].filter(x => x !== undefined))
    });
  }
}