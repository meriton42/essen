import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, NicePercentPipe, NicePipe } from './app.component';
import { FoodSelectorComponent } from './food-selector.component';
import { FormsModule } from '@angular/forms';
import { CoverageIndicatorComponent } from './coverage-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    CoverageIndicatorComponent,
    FoodSelectorComponent,
    NicePipe,
    NicePercentPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
