import { Food } from "./naehrwert";

export type Recipe = Array<{
	amount: number,
	food: Food,
	nutrients: number[],
}>

export function updateNutrients(recipe: Recipe) {
	const types = recipe[0].food?.nutrients?.length || 0;
	const totalNutrients = new Array(types).fill(0);
	for (const item of recipe) {
		item.nutrients = new Array(types);
		for (let i = 0; i < types; i++) {
			item.nutrients[i] = (item.amount / 100 * item.food?.nutrients[i]) || null;
			totalNutrients[i] += item.nutrients[i] || 0;
		}
	}
	return totalNutrients;
}