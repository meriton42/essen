import { Component, Pipe, PipeTransform } from '@angular/core';
import * as bedarf from './bedarf';
import { naehrwert } from './naehrwert';
import { Recipe, updateNutrients } from './recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

@Pipe({
  name: 'nice',
})
export class NicePipe implements PipeTransform {
  transform(value: number | null, magnitude?: number) {
    if (value == null) {
      return null;
    } else {
      const m = magnitude || value;
      const digits = m <  10 ? 2 
                   : m < 100 ? 1
                             : 0;
      return value.toFixed(digits);
    }
  }
}

@Pipe({
  name: 'nicePercent'
})
export class NicePercentPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return isNaN(value) ? '' : Math.round(value * 100) + "%";
  }
}