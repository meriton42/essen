import { Component, Input } from "@angular/core";
import { CoverageReport} from "./bedarf";

@Component({
	selector: 'coverage-indicator',
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
							<div style="position: relative; min-height: 101px; width: 3ch; margin-left: auto; margin-right: auto;" *ngIf="report">
								<hr style="top: 0">
								<hr style="top: 100px">
								<hr style="top: {{report.maxAt * 100}}px" *ngIf="report.maxAt">
								<div style="margin-left: 2px; margin-right: 2px"
									[style.height]="report.coverage * 100 + 'px'"
									[style.background-color]="color"
								></div>
							</div>
						`
})
export class CoverageIndicatorComponent {
	@Input()
	report!: CoverageReport | null;

	get color() {
		const {goodness} = this.report!;
		const red = 255 * (1 - goodness);
		const green = 192 * goodness;
		const blue = 0;
		return `rgb(${red}, ${green}, ${blue})`;
	}
}