import { Food } from "./naehrwert";

export type Recipe = Array<{
	amount: number | null,
	food: Food | null,
	nutrients: Array<number | null>,
}>

export function updateNutrients(recipe: Recipe) {
	const types = recipe[0].food?.nutrients?.length || 0;
	const totalNutrients = new Array(types).fill(0);
	for (const item of recipe) {
		item.nutrients = new Array(types);
		for (let i = 0; i < types; i++) {
			const d = item.food?.nutrients[i];
			item.nutrients[i] = d && item.amount ? d * item.amount / 100 : null;
			totalNutrients[i] += item.nutrients[i] || 0;
		}
	}
	return totalNutrients;
}