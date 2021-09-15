import { Component } from '@angular/core';
import { naehrwert } from './naehrwert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'essen';

  constructor() {
    console.log(naehrwert);
  }
}