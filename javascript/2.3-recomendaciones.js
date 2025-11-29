/*
  Sistema de recomendación de libros

  Algoritmo:
  1. Filtrar libros de categorías que el usuario ha leído (0.3 pts)
  2. Calcular score de recomendación para cada libro (0.4 pts):
	  - Popularidad: +1 punto por cada 10 préstamos
	  - Recencia: libros 2020+ tienen +2 puntos
	  - Rating: rating * 10 puntos
  3. Reducir a top 10 libros con mayor score (0.3 pts)
 */
/**
 * @param {Array} libros - Array de objetos libro {id, titulo, categoria, año, rating}
 * @param {Object} usuario - Objeto usuario {id, categoriasFavoritas: Array de strings}
 * @param {Array} historialPrestamos - Array de objetos {libroId, cantidad}
 * @returns {Array} Top 10 libros recomendados con score agregado
 */
function recomendarLibros(libros, usuario, historialPrestamos) {
	// PASO 1: Filtrar por categorías favoritas del usuario
	/**
	 * @returns Un array de libros que coinciden con las categorías favoritas del usuario
	 */
	const librosRelevantes = libros.filter(libro =>
		usuario.categoriasFavoritas.includes(libro.categoria)
	);

	// PASO 2: Agregar score a cada libro
	// map: transforma cada libro agregando su score de recomendación
	/**
	 * @param {Object} libro Objeto libro
	 * @returns {Object} Nuevo objeto libro con score agregado
	 */
	const librosConScore = librosRelevantes.map(libro => {
		// Buscar el historial de préstamos de este libro
		const prestamo = historialPrestamos.find(p => p.libroId === libro.id) || { cantidad: 0 };

		// Calcular score según las reglas:
		// Math.floor divide entre 10 y redondea hacia abajo
		const popularidad = Math.floor(prestamo.cantidad / 10);

		// verificar si el año es 2020 o posterior
		const recencia = libro.año >= 2020 ? 2 : 0;

		// multiplicar el rating por 10
		const ratingScore = libro.rating * 10;

		// Sumar todos los componentes del score
		const score = popularidad + recencia + ratingScore;

		// Retornar un nuevo objeto con el libro original y su score
		// Usar spread operator (...) para mantener inmutabilidad
		return { ...libro, score };
	});

	// PASO 3: Obtener top 10
	// sort: ordena por score de mayor a menor (b - a para descendente)
	// slice: toma los primeros 10 elementos
	// IMPORTANTE: usar slice para no mutar el array original (sort muta)
	const top10 = librosConScore
		.slice() // Crear copia para no mutar el array original
		.sort((a, b) => b.score - a.score) // Ordenar por score descendente
		.slice(0, 10); // Tomar los primeros 10

	return top10;
}

// Ejemplo de datos:
const usuario = {
	id: 1,
	categoriasFavoritas: ["Programacion", "Matematicas"]
};

const libros = [
	{ id: 1, titulo: "Clean Code", categoria: "Programacion", año: 2008, rating: 4.5 },
	{ id: 2, titulo: "Refactoring", categoria: "Programacion", año: 2018, rating: 4.7 },
	{ id: 3, titulo: "Design Patterns", categoria: "Programacion", año: 1994, rating: 4.8 },
	{ id: 4, titulo: "Introduction to Algorithms", categoria: "Matematicas", año: 2009, rating: 4.6 },
	{ id: 5, titulo: "Calculus", categoria: "Matematicas", año: 2020, rating: 4.3 },
	{ id: 6, titulo: "Linear Algebra", categoria: "Matematicas", año: 2021, rating: 4.4 },
	{ id: 7, titulo: "The Art of War", categoria: "Historia", año: 2015, rating: 4.1 },
	{ id: 8, titulo: "Python Crash Course", categoria: "Programacion", año: 2022, rating: 4.9 },
	{ id: 9, titulo: "JavaScript: The Good Parts", categoria: "Programacion", año: 2008, rating: 4.2 },
	{ id: 10, titulo: "Code Complete", categoria: "Programacion", año: 2004, rating: 4.7 },
	{ id: 11, titulo: "Discrete Mathematics", categoria: "Matematicas", año: 2023, rating: 4.8 },
	{ id: 12, titulo: "Algorithms Unlocked", categoria: "Matematicas", año: 2013, rating: 4.0 }
];

const historialPrestamos = [
	{ libroId: 1, cantidad: 45 },
	{ libroId: 2, cantidad: 23 },
	{ libroId: 3, cantidad: 67 },
	{ libroId: 4, cantidad: 34 },
	{ libroId: 5, cantidad: 12 },
	{ libroId: 6, cantidad: 8 },
	{ libroId: 8, cantidad: 89 },
	{ libroId: 9, cantidad: 56 },
	{ libroId: 10, cantidad: 71 },
	{ libroId: 11, cantidad: 15 },
	{ libroId: 12, cantidad: 28 }
];

// Ejecutar y mostrar resultados
const recomendaciones = recomendarLibros(libros, usuario, historialPrestamos);

console.log("Top 10 Libros Recomendados:");
console.log("============================\n");

recomendaciones.forEach((libro, index) => {
	const prestamo = historialPrestamos.find(p => p.libroId === libro.id) || { cantidad: 0 };
	console.log(`${index + 1}. ${libro.titulo}`);
	console.log(`   Categoría: ${libro.categoria}`);
	console.log(`   Año: ${libro.año}`);
	console.log(`   Rating: ${libro.rating}`);
	console.log(`   Préstamos: ${prestamo.cantidad}`);
	console.log(`   Score Total: ${libro.score}`);
	console.log();
});
