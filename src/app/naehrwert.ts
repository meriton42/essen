import naehrwertdatenbank from "./Schweizer-Nahrwertdatenbank";

const [title, blank, header, ...foods] = naehrwertdatenbank.split("\n").map(parseFood);
export const naehrwert = {header, foods};

function parseFood(line: string) {
	const [id, idv4, idFir, name, synonyms, category, density, referenceUnit, ...rest] = line.split("\t");
	rest.pop(); // discard "changed" column
	const nutrients = triples(rest).map(parseContentInfo);
	const unit = density ? "ml" : "g"; // we aren't using the referenceUnit, because that contains a lot of boilerplate, like "per 100g essbarer Anteil", which we don't want to repeat for each individual item
	return {id, name, synonyms, category, density, unit, nutrients};
}

export type Food = ReturnType<typeof parseFood>;

type Triple = [string, string, string];
function triples(data: string[]) {
	const size = 3;
	const res: Triple[] = [];
	for (let i = 0; i < data.length; i += size) {
		res.push(data.slice(i, i + size) as Triple);
	}
	return res;
}

function parseContentInfo([amount, derivation, citation]: Triple) {
	if (amount == 'k.A.') {
		return null;
	} else if (amount == 'Sp.') {
		return 0; // allergies are not our concern here
	} else if (amount.startsWith("<")) {
		// we assume the upper limit of the given range
		amount = amount.slice(1);
	}
	const n = +amount;
	if (isNaN(n)) {
		return amount as unknown as number; // column header, but let's not mess up the typing for this edge case
	} else {
		return n;
	}
}