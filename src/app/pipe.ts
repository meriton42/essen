import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'nice',
	standalone: true,
})
export class NicePipe implements PipeTransform {
	transform(value: number | null, magnitude?: number) {
		if (value == null) {
			return null;
		} else {
			const m = magnitude || value;
			const digits = m <  10 ? 2 
			             : m < 100 ? 1
			                       : 0;
			return value.toFixed(digits);
		}
	}
}

@Pipe({
	name: 'nicePercent',
	standalone: true,
})
export class NicePercentPipe implements PipeTransform {
	transform(value: any, ...args: any[]) {
		return isNaN(value) ? '' : Math.round(value * 100) + "%";
	}
}