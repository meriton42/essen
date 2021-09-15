import { Component, Pipe, PipeTransform } from '@angular/core';
import { naehrwert } from './naehrwert';
import { Recipe, updateNutrients } from './recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipe: Recipe = [];

  nutrientNames = naehrwert.header.nutrients;
  
  totalNutrients: number[];

  constructor() {
    this.update();
  }

  update() {
    const r = this.recipe;
    if (r.length == 0 || r[r.length - 1].food) {
      r.push({} as any);
    }
    this.totalNutrients = updateNutrients(this.recipe);
  }
}

@Pipe({
  name: 'nice',
})
export class NicePipe implements PipeTransform {
  transform(value: number, ...args: any[]) {
    return value?.toFixed(1);
  }
}