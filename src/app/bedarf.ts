const weight = 80;
const age = 40;
const gender = "male";
const pal = 1.5; // "Office worker getting little or no exercise"

// laut https://www.dge.de/fileadmin/public/doc/ws/faq/FAQs-Energie.pdf
const MJPerGram = {
	carb: 0.017,
	protein: 0.017,
	fat: 0.037,
}

function gFromRI(percent: number, kind: keyof typeof MJPerGram) {
	return percent / 100 * energyMJ / MJPerGram[kind];
}


// laut https://multimedia.efsa.europa.eu/drvs/index.htm

/** recommended energy intake */
const energyMJ = 10.0;

export const help = {
	AI: "An adequate intake (AI) is used when there isn't enough data to calculate an average requirement. An AI is the average nutrient level, based on observations or experiments, that is assumed to be adequate for the population's needs.",
	AR: "The average requirement (AR) refers to the intake of a nutrient that meets the daily needs of half the people in a typical healthy population.",
	PRI: "The population reference intake (PRI) is the intake of a nutrient that is likely to meets the needs of almost all healthy people in a population.",
	UL: "The tolerable upper intake level (UL) is the maximum chronic daily intake of a nutrient (from all sources) judged to be unlikely to pose a risk of adverse health effects to humans.",
}
type Limit = keyof typeof help;
export const limits = Object.keys(help) as Limit[];
export const limitName: {[l in Limit]: string} = {
	AI: "adequate intake",
	AR: "average requirement",
	PRI: "population reference intake",
	UL: "tolerable upper intake level",
}

export const drv: {[nutrient in string]: {[l in Limit]?: number}} = {
	"Energie, Kilojoule (kJ)": {AR: energyMJ * 1000},
	"Energie, Kalorien (kcal)": {AR: energyMJ * 239},
	"Fett, total (g)": {AI: gFromRI(20, "fat"), UL: gFromRI(35, "fat")},
	"Fettsäuren, gesättigt (g)": {},
	"Fettsäuren, einfach ungesättigt (g)": {},
	"Fettsäuren, mehrfach ungesättigt (g)": {AI: gFromRI(0.5, "fat")}, // alpha linolenic acid
	"Cholesterin (mg)": {},
	"Kohlenhydrate, verfügbar (g)": {AI: gFromRI(45, "carb"), UL: gFromRI(60, "carb")},
	"Zucker (g)": {UL: gFromRI(10, "carb")}, // laut https://www.blv.admin.ch/blv/de/home/lebensmittel-und-ernaehrung/ernaehrung/produktzusammensetzung/zuckerreduktion.html
	"Stärke (g)": {},
	"Nahrungsfasern (g)": {AI: 25},
	"Protein (g)": {AR: 0.66 * weight, PRI: 0.83 * weight},
	"Salz (NaCl) (g)": {AI: 5, UL: 5},
	"Alkohol (g)": {},
	"Wasser (g)": {AI: 2500},
	"Vitamin A-Aktivität, RE (µg-RE)": {AR: 570, PRI: 750, UL: 3000},
	"Vitamin A-Aktivität, RAE (µg-RE)": {}, 
	"Retinol (µg)": {}, // Vorstufe von Vitamin A
	"Betacarotin-Aktivität (µg-BCE)": {}, // Vorstufe von Vitamin A
	"Betacarotin (µg)": {}, // Vorstufe von Vitamin A
	"Vitamin B1 (Thiamin) (mg)": {AR: 0.072 * energyMJ, PRI: 0.1 * energyMJ},
	"Vitamin B2 (Riboflavin) (mg)": {AR: 1.3, PRI: 1.6},
	"Vitamin B6 (Pyridoxin) (mg)": {AR: 1.5, PRI: 1.7, UL: 25},
	"Vitamin B12 (Cobalamin) (µg)": {AI: 4},
	"Niacin (mg)": {AR: 1.3 * energyMJ, PRI: 1.6 * energyMJ, UL: 10},
	"Folat (µg)": {AR: 250, PRI: 330, UL: 1000}, // UL only applies to synthentic sources
	"Pantothensäure (mg)": {AI: 5},
	"Vitamin C (Ascorbinsäure) (mg)": {AR: 90, AI: 110},
	"Vitamin D (Calciferol) (µg)": {AI: 15, UL: 100},
	"Vitamin E-Aktivität (mg-ATE)": {AI: 13, UL: 300},
	"Kalium (K) (mg)": {AI: 3500},
	"Natrium (Na) (mg)": {AI: 2000, UL: 2000},
	"Chlorid (Cl) (mg)": {AI: 3100, UL: 3100},
	"Calcium (Ca) (mg)": {AR: 750, PRI: 950, UL: 2500},
	"Magnesium (Mg) (mg)": {AI: 350, /* UL omitted, since way to complicated*/},
	"Phosphor (P) (mg)": {AI: 550},
	"Eisen (Fe) (mg)": {AR: 6, PRI: 11},
	"Jod (I) (µg)": {AI: 150, UL: 600},
	"Zink (Zn)  (mg)": {AR: 11, PRI: 14, UL: 25},
	"Selen (Se) (µg)": {AI: 70},
}
export type Nutrient = keyof typeof drv;

export function coverageReport(amount: number, nutrient: Nutrient) {
	const {AI, AR, PRI, UL} = drv[nutrient];
	const min = PRI ?? AR ?? AI;
	if (!min) return null;
	const max = UL;
	const coverage = amount / min;
	const maxAt = max && max / min;
	return {coverage, maxAt};
}
export type CoverageReport = NonNullable<ReturnType<typeof coverageReport>>;