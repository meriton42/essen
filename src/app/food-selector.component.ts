import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Food, naehrwert } from "./naehrwert";
import { Recipe } from "./recipe";

@Component({
	selector: 'food-selector',
	standalone: true,
	imports: [FormsModule],
	template: `
		<input #input [ngModel]="value?.name" (ngModelChange)="search($event)">
		@if (hasFocus && options) {
			<div class="optionContainer">
				<div class="options">
					@for (food of options; track food.name) {
						<button (click)="select(food)">{{food.name}}</button>
					}
				</div>
			</div>
		}
	`,
	styleUrls: ["food-selector.component.css"],
})
export class FoodSelectorComponent {

	@Input()
	value!: Food | Recipe | null;

	@Output()
	valueChange = new EventEmitter<Food>();

	options: Food[] | null = null;

	hasFocus = false;

	foodSelectorElement: HTMLElement;

	constructor(elementRef: ElementRef) {
		this.foodSelectorElement = elementRef.nativeElement as HTMLElement;
	}

	@ViewChild("input")
	input!: ElementRef;

	@HostListener("focusin")
	onfocus() {
		this.hasFocus = true;
	}

	@HostListener("focusout", ["$event"])
	onFocusLoss(event: FocusEvent) {
		// might be an internal transfer => check destination
		this.hasFocus = this.foodSelectorElement.contains(event.relatedTarget as Node);
	}

	search(term: string) {
		this.options = naehrwert.foods.filter(f => f.name.toLowerCase().includes(term.toLowerCase()) || f.synonyms.toLowerCase().includes(term.toLowerCase()));
	}

	select(food: Food) {
		this.valueChange.emit(food);
		this.options = null; // hide the list
		this.input.nativeElement.focus();
	}

	@HostListener("keydown", ["$event"])
	ifDownGoDown(event: KeyboardEvent) {
		const {key, target} = event;
		// since the browser does not provide a focusNext() method, we must find the element to focus ourselves ...
		// we do this by manually navigating the DOM since template variable references into an *ngIf, or to different iterations of *ngFor, are not supported
		switch (key) {
			case 'ArrowDown':
				if (target instanceof HTMLInputElement) {
					this.foodSelectorElement.querySelector("button")?.focus();
				} else {
					((target as HTMLButtonElement).nextElementSibling as HTMLButtonElement).focus();
				}
				event.preventDefault();
				break;
			case 'ArrowUp':
				if (target instanceof HTMLButtonElement) {
					(target.previousElementSibling as HTMLButtonElement || this.input.nativeElement).focus();
				}
				event.preventDefault();
				break;
			case 'Escape':
				if (target instanceof HTMLButtonElement) {
					this.input.nativeElement.focus();
				}
				event.preventDefault();
				break;
		}
	}
}