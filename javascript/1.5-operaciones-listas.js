/**
 * Genera un reporte completo de la biblioteca
 * Usa SOLO: map, filter, reduce, sort, etc.
 */
/**
 * @param {Array} libros - Array de objetos libro {id, titulo, categoria, año, prestado}
 * @param {Array} prestamos - Array de objetos préstamo {id, libroId, usuarioId, fechaPrestamo, activo}
 * @param {Array} usuarios - Array de objetos usuario {id, nombre, email}
 * @returns {Object} Reporte con estadísticas de la biblioteca
 */
function generarReporteCompleto(libros, prestamos, usuarios) {
	return {
		// Total de libros por categoria (0.15 puntos)
		librosPorCategoria: libros.reduce((acumulador, libro) => {
			acumulador[libro.categoria] = (acumulador[libro.categoria] || 0) + 1;
			return acumulador;
		}, {}),

		// Top 5 usuarios más activos (0.15 puntos)
		usuariosMasActivos: usuarios
			.map((usuario) => {
				const cantidadPrestamos = prestamos.filter(
					(prestamo) => prestamo.usuarioId === usuario.id
				).length;
				return { ...usuario, cantidadPrestamos };
			})
			.sort((a, b) => b.cantidadPrestamos - a.cantidadPrestamos)
			.slice(0, 5),

		// Libros más prestados (0.15 puntos)
		librosMasPrestados: Object.entries(
			prestamos.reduce((acumulador, prestamo) => {
				acumulador[prestamo.libroId] = (acumulador[prestamo.libroId] || 0) + 1;
				return acumulador;
			}, {})
		)
			.map(([libroId, cantidad]) => {
				const libro = libros.find((l) => l.id === parseInt(libroId));
				return { libro: libro.titulo || "Desconocido", cantidad };
			})
			.sort((a, b) => b.cantidad - a.cantidad),

		// Tasa de préstamos activos (0.15 puntos)
		tasaPrestamosActivos:
			prestamos.length > 0
				? ((prestamos.filter((p) => p.activo).length / prestamos.length) * 100)
					.toFixed(2) + "%"
				: "0%",
	};
}

// Datos de ejemplo
const libros = [
	{
		id: 1,
		titulo: "Design Patterns",
		categoria: "Programacion",
		anio: 1994,
		prestado: true
	},
	{
		id: 2,
		titulo: "Refactoring",
		categoria: "Programacion",
		anio: 1999,
		prestado: false
	},
	{
		id: 3,
		titulo: "Clean Code",
		categoria: "Programacion",
		anio: 2008,
		prestado: false
	},
	{
		id: 4,
		titulo: "Calculus",
		categoria: "Matematicas",
		anio: 2010,
		prestado: false
	},
];

const usuarios = [
	{ id: 1, nombre: "Israel Asanza", email: "isasanza@utpl.edu.ec" },
	{ id: 2, nombre: "Jorge Beltran", email: "jbeltran@utpl.edu.ec" },
	{ id: 3, nombre: "Andrea Cuenca", email: "ancuenca@utpl.edu.ec" },
];

const prestamos = [
	{ id: 1, libroId: 1, usuarioId: 1, fechaPrestamo: "2024-01-15", activo: false },
	{ id: 2, libroId: 2, usuarioId: 1, fechaPrestamo: "2024-01-10", activo: true },
	{ id: 3, libroId: 3, usuarioId: 2, fechaPrestamo: "2024-02-20", activo: false },
	{ id: 4, libroId: 1, usuarioId: 3, fechaPrestamo: "2024-02-01", activo: true },
	{ id: 5, libroId: 1, usuarioId: 2, fechaPrestamo: "2024-03-05", activo: true },
	{ id: 6, libroId: 2, usuarioId: 3, fechaPrestamo: "2024-03-06", activo: false },
	{ id: 7, libroId: 3, usuarioId: 3, fechaPrestamo: "2024-03-07", activo: true },
	{ id: 8, libroId: 3, usuarioId: 1, fechaPrestamo: "2024-03-15", activo: false },
	{ id: 9, libroId: 3, usuarioId: 2, fechaPrestamo: "2024-06-25", activo: false },
];

const reporte = generarReporteCompleto(libros, prestamos, usuarios);
console.log("Reporte de la Biblioteca:");
console.log("\n1. Mejores categorías:");
console.log(reporte.librosPorCategoria);
console.log("\n2. Top 5 usuarios más activos:");
console.log(reporte.usuariosMasActivos);
console.log("\n3. Libros más prestados:");
console.log(reporte.librosMasPrestados);
console.log("\n4. Tasa de préstamos activos:");
console.log(reporte.tasaPrestamosActivos);
