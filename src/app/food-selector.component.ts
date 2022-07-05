import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { Food, naehrwert } from "./naehrwert";

@Component({
	selector: 'food-selector',
	template: `
		<input #input [ngModel]="value?.name" (ngModelChange)="search($event)" (keydown)="ifDownGoDown($event);">
		<div class="optionContainer" *ngIf="hasFocus && options">
			<div class="options">
				<button (click)="select(food)" (keydown)="ifDownGoDown($event)" *ngFor="let food of options">{{food.name}}</button>
			</div>
		</div>
	`,
	styleUrls: ["food-selector.component.css"],
})
export class FoodSelectorComponent {

	@Input()
	value: Food;

	@Output()
	valueChange = new EventEmitter<Food>();

	options: Food[];

	hasFocus = false;

	@ViewChild("input")
	input: ElementRef;

	@HostListener("focusin")
	onfocus() {
		this.hasFocus = true;
	}

	@HostListener("focusout")
	onFocusLoss() {
		this.hasFocus = false;
	}

	search(term: string) {
		this.options = naehrwert.foods.filter(f => (f.name || '').toLowerCase().includes(term.toLowerCase()));
	}

	select(food: Food) {
		this.valueChange.emit(food);
		this.options = null; // hide the list
		this.input.nativeElement.focus();
	}

	ifDownGoDown(event: KeyboardEvent) {
		// since the browser does not provide a focusNext() method, we must find the element to focus ourselves ...
		// we do this by manually navigating the DOM since template variable references into an *ngIf, or to different iterations of *ngFor, are not supported
		switch (event.key) {
			case 'ArrowDown':
				if (event.target instanceof HTMLInputElement) {
					event.target.parentElement.querySelector("button").focus();
				} else {
					((event.target as HTMLButtonElement).nextElementSibling as HTMLButtonElement).focus();
				}
				event.preventDefault();
				break;
			case 'ArrowUp':
				if (event.target instanceof HTMLButtonElement) {
					(event.target.previousElementSibling as HTMLButtonElement || this.input.nativeElement).focus();
				}
				event.preventDefault();
				break;
			case 'Escape':
				if (event.target instanceof HTMLButtonElement) {
					this.input.nativeElement.focus();
				}
				event.preventDefault();
				break;
		}
	}
}