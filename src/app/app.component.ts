import { Component } from '@angular/core';
import * as bedarf from './bedarf';
import { naehrwert } from './naehrwert';
import { Recipe, updateNutrients } from './recipe';
import { FoodSelectorComponent } from './food-selector.component';
import { NicePercentPipe, NicePipe } from './nice-pipe';
import { FormsModule } from '@angular/forms';
import { CoverageIndicatorComponent } from './coverage-indicator.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CoverageIndicatorComponent, FoodSelectorComponent, NicePipe, NicePercentPipe ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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