const libros = [
	{
		id: 1,
		titulo: "Clean Code",
		categoria: "Programacion",
		anio: 2008,
		prestado: false,
	},
	{
		id: 2,
		titulo: "Design Patterns",
		categoria: "Programacion",
		anio: 1994,
		prestado: true,
	},
	{
		id: 3,
		titulo: "Refactoring",
		categoria: "Programacion",
		anio: 1999,
		prestado: false,
	},
	{
		id: 4,
		titulo: "Calculus",
		categoria: "Matematicas",
		anio: 2010,
		prestado: false,
	},
];

function filtrarLibrosImperativo(libros, categoria) {
	let result = [];
	for (let i = 0, libro = libros.length; i < libro; i++) {
		if (libros[i].categoria === categoria && !libros[i].prestado) {
			result.push(libros);
		}
	}

	for (let i = 0; i < result.length - 1; i++) {
		for (let j = i + 1; j < result.length; j++) {
			if (result[i].anio > result[j].anio) {
				// swap
				let temp = result[i];
				result[i] = result[j];
				result[j] = temp;
			}
		}
	}
	return result;
}

function filtrarLibrosDeclarativo(libros, categoria) {
	return libros
		// filter: recorre el array y devuelve nuevo array con elementos que cumplen la condición
		.filter((libro) => !libro.prestado && libro.categoria === categoria)
		// sort: ordena el array según la función de comparación (x.anio - y.anio = orden ascendente)
		.sort((x, y) => x.anio - y.anio);
}
