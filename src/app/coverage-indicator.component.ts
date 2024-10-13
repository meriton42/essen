import { Component, Input } from "@angular/core";
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
		@if (report) {
			<div style="position: relative; min-height: 101px; width: 3ch; margin-left: auto; margin-right: auto;">
				<hr style="top: 0">
				<hr style="top: 100px">
				@if (report.maxAt) {
					<hr [style.top]="y(report.maxAt)">
				}
				<div style="margin-left: 2px; margin-right: 2px">
					@if (report.maxAt && report.coverage > report.maxAt) {
						<div style="background-color: forestgreen" [style.height]="y(report.maxAt)"></div>
						<div style="background-color: orange" [style.height]="y(report.coverage - report.maxAt)"></div>
					} @else {
						<div style="background-color: forestgreen" [style.height]="y(report.coverage)"></div>
						@if (report.coverage < 1) {
							<div style="background-color: lightgreen" [style.top]="y(report.coverage)" [style.height]="y(1 - report.coverage)"></div>
						}
					}
				</div>
			</div>
		}
	`
})
export class CoverageIndicatorComponent {
	@Input()
	report!: CoverageReport | null;

	y(coverage: number) {
		return coverage * 100 + "px";
	}
}