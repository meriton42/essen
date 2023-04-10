import { Food } from "./naehrwert";

export type Recipe = {
	amount: number, // 1
	unit: string,  // bowl
	name: string,  // oatmeal
	ingredients: Array<{
		amount: number | null,
		food: Food | Recipe | null,
		nutrients: Array<number | null>,
	}>,
	nutrients: Array<number>,
}

export function updateNutrients(recipe: Recipe) {
	const {ingredients} = recipe;
	const types = ingredients[0].food?.nutrients?.length || 0;
	const totalNutrients = new Array(types).fill(0);
	for (const item of ingredients) {
		item.nutrients = new Array(types);
		for (let i = 0; i < types; i++) {
			const d = item.food?.nutrients[i];
			item.nutrients[i] = d && item.amount && item.food?.amount ? d * item.amount / item.food.amount : null;
			totalNutrients[i] += item.nutrients[i] || 0;
		}
	}
	recipe.nutrients = totalNutrients;
}