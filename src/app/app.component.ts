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
  recipe: Recipe = [];
  days = 1;

  nutrientNames = naehrwert.header.nutrients;
  totalNutrients: number[];

  bedarf = bedarf;

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

@Pipe({
  name: 'nicePercent'
})
export class NicePercentPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return isNaN(value) ? '' : Math.round(value * 100) + "%";
  }
}