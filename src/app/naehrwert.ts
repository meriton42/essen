import nw from "raw-loader!./Schweizer-Nahrwertdatenbank.txt";

const [title, blank, header, ...foods] = nw.split("\r\n").map(s => {
	const [id, idv4, idFir, name, synonyms, category, density, unit, ...rest] = s.split("\t");
	rest.pop(); // discard "changed" column
	const nutrients = triples(rest).map(parseContentInfo);
	return {id, name, synonyms, category, density, unit, nutrients};
});

export const naehrwert = {header, foods};

function triples(data: string[]) {
	const size = 3;
	const res: string[][] = [];
	for (let i = 0; i < data.length; i += size) {
		res.push(data.slice(i, i + size));
	}
	return res;
}

function parseContentInfo([amount, derivation, citation]) {
	if (amount == 'k.A.') {
		return null;
	}
	const n = +amount;
	return isNaN(n) ? amount : n;
}