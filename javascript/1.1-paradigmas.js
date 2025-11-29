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

/**
 * @param {Array} libros - Array de objetos libro {id, titulo, categoria, año, prestado}
 * @param {string} categoria - Categoría a filtrar
 * @returns {Array} Array de libros filtrados y ordenados por año ascendente
 */
function filtrarLibrosImperativo(libros, categoria) {
	let result = [];
	for (let i = 0; i < libros.length; i++) {
		if (libros[i].categoria === categoria && !libros[i].prestado) {
			result.push(libros[i]);
		}
	}

	// Ordenar por año ascendente (burbuja)
	for (let i = 0; i < result.length - 1; i++) {
		for (let j = i + 1; j < result.length; j++) {
			if (result[i].anio > result[j].anio) {
				let temp = result[i];
				result[i] = result[j];
				result[j] = temp;
			}
		}
	}
	return result;
}

/**
 * @param {Array} libros - Array de objetos libro {id, titulo, categoria, año, prestado}
 * @param {string} categoria - Categoría a filtrar
 * @returns {Array} Array de libros filtrados y ordenados por año ascendente
 */
function filtrarLibrosDeclarativo(libros, categoria) {
	return libros
		.filter((libro) => !libro.prestado && libro.categoria === categoria)
		.sort((x, y) => x.anio - y.anio);
}

// Ejemplo 1: Filtrar libros de Programación
console.log("=== Libros de Programación (Imperativo) ===");
const programacionImperativo = filtrarLibrosImperativo(libros, "Programacion");
programacionImperativo.forEach((libro) => {
	console.log(`${libro.titulo} (${libro.anio})`);
});

console.log("\n=== Libros de Programación (Declarativo) ===");
const programacionDeclarativo = filtrarLibrosDeclarativo(libros, "Programacion");
programacionDeclarativo.forEach((libro) => {
	console.log(`${libro.titulo} (${libro.anio})`);
});

// Ejemplo 2: Filtrar libros de Matemáticas
console.log("\n=== Libros de Matemáticas (Declarativo) ===");
const matematicas = filtrarLibrosDeclarativo(libros, "Matematicas");
matematicas.forEach((libro) => {
	console.log(`${libro.titulo} (${libro.anio}) - Prestado: ${libro.prestado}`);
});

// Ejemplo 3: Categoría sin resultados
console.log("\n=== Libros de Historia ===");
const historia = filtrarLibrosDeclarativo(libros, "Historia");
console.log(historia.length === 0 ? "No hay libros disponibles" : historia);

// Ejemplo 4: Comparar resultados de ambos métodos
console.log("\n=== Comparación de métodos ===");
console.log("Imperativo:", JSON.stringify(programacionImperativo.map(l => l.titulo)));
console.log("Declarativo:", JSON.stringify(programacionDeclarativo.map(l => l.titulo)));
