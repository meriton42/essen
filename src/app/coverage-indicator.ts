import { Component, input, Input } from "@angular/core";
import { CoverageReport} from "./bedarf";

@Component({
	selector: 'coverage-indicator',
	standalone: true,
	styles: [`
		hr {
			position: absolute; 
			margin: 0; 
			width: 100%; 
			height: 1px; 
			background: black;
			border: none;
		}
	`],
	template: `
		@let r = report();
		@if (r) {
			<div style="position: relative; min-height: 101px; width: 3ch; margin-left: auto; margin-right: auto;">
				<div>
					@if (r.maxAt && r.coverage > r.maxAt) {
						<div style="background-color: forestgreen" [style.height]="y(r.maxAt)"></div>
						<div style="background-color: orange" [style.height]="y(r.coverage - r.maxAt)"></div>
					} @else {
						<div style="background-color: forestgreen" [style.height]="y(r.coverage)"></div>
						@if (r.coverage < 1) {
							<div style="background-color: lightgreen" [style.top]="y(r.coverage)" [style.height]="y(1 - r.coverage)"></div>
						}
					}
				</div>
			</div>
		}
	`
})
export class CoverageIndicator {
	report = input.required<CoverageReport | null>();

	y(coverage: number) {
		return coverage * 100 + "px";
	}
}