import { Component, computed, input } from "@angular/core";

@Component({
	selector: 'coverage-indicator',
	standalone: true,
	template: `
		@let av = available();
		@let min = needed().min;
		@let max = needed().max;

		@if (min || max) {
			<div style="position: relative; min-height: 101px; width: 3ch; margin-left: auto; margin-right: auto;">
				<div>
					@if (min) {
						@if (max && av > max) {
							<div style="background-color: forestgreen" [style.height]="y(max)"></div>
							<div style="background-color: orange" [style.height]="y(av - max)"></div>
						} @else {
							<div style="background-color: forestgreen" [style.height]="y(av)"></div>
							@if (av < min) {
								<div style="background-color: lightgreen" [style.top]="y(av)" [style.height]="y(min - av)"></div>
							}
						}
					} @else if (max) {
						@if (av < max) {
							<div style="background-color: hsl(40 100% 75%)" [style.height]="y(av)"></div>
						} @else {
							<div style="background-color: hsl(40 100% 75%)" [style.height]="y(max)"></div>
							<div style="background-color: orange" [style.top]="y(max)" [style.height]="y(av - max)"></div>
						}
					}
				</div>
			</div>
		}
	`
})
export class CoverageIndicator {
	available = input.required<number>();
	needed = input.required<{min?: number, max?: number}>();

	scale = computed(() => {
		const {min, max} = this.needed();
		const reference = (min || max)!;
		return 100 / reference;
    });

	y(v: number) {
		return v * this.scale() + "px";
	}
}