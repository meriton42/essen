import { Component } from '@angular/core';
import { Food, naehrwert } from './naehrwert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  food: Food;
}