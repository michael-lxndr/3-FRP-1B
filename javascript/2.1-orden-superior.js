/**
 * Crea un filtrador personalizado usando closures
 * Retorna una función que puede usarse con Array.filter()
 */
function crearFiltrador(criterio) {
	// Retorna una función que "recuerda" el criterio (closure)
	return function (libro) {
		const tituloLower = (libro.titulo || "").toLowerCase();
		const criterioTitulo = (criterio.titulo || "").toLowerCase();

		// Si el criterio tiene título, verifica que esté contenido
		if (criterioTitulo && !tituloLower.includes(criterioTitulo)) {
			return false;
		}

		if (!criterio.categoria) {
			return true;
		}

		// Si el criterio tiene categoría, verifica que coincida
		if ((criterio.categoria).toLowerCase() && (libro.categoria).toLowerCase() !== (criterio.categoria).toLowerCase()) {
			return false;
		}

		// Si el criterio tiene año no entra
		if (!criterio.anio) {
			return true;
		}

		// Verifica según el operador
		if ((criterio.operador).toLowerCase() === "mayor" && libro.anio <= criterio.anio) {
			return false;
		}
		if ((criterio.operador).toLowerCase() === "menor" && libro.anio >= criterio.anio) {
			return false;
		}
		if ((criterio.operador).toLowerCase() === "igual" && libro.anio !== criterio.anio) {
			return false;
		}


	};
}

/**
 * Procesa préstamos aplicando una estrategia (función) a cada uno
 */
function procesarPrestamos(prestamos, estrategia) {
	// map: aplica la función estrategia a cada préstamo
	return prestamos.map(estrategia);
}

// Datos de ejemplo
const libros = [
	{ id: 1, titulo: "Clean Code", categoria: "Programacion", anio: 2008 },
	{ id: 2, titulo: "Design Patterns", categoria: "Programacion", anio: 1994 },
	{ id: 3, titulo: "Calculus", categoria: "Matematicas", anio: 2010 },
	{ id: 4, titulo: "Advanced JavaScript", categoria: "Programacion", anio: 2021 },
];

const prestamos = [
	{ id: 1, libroId: 1, diasRetraso: 5, activo: true },
	{ id: 2, libroId: 2, diasRetraso: 0, activo: true },
	{ id: 3, libroId: 3, diasRetraso: 10, activo: false },
];

// ? Ejemplo A: Closure - Función que retorna función
console.log("=== Ejemplo A: Closures ===\n");

// ! X titulo
const filtrarProgramacionTitle = crearFiltrador({ titulo: "Code" });
const librosProgramacionTitle = libros.filter(filtrarProgramacionTitle);
console.log("Libros de Programación con título 'Advanced':");
console.log(librosProgramacionTitle);

// ! X Categoría
const filtrarProgramacion = crearFiltrador({ categoria: "Programacion" });
const librosProgramacion = libros.filter(filtrarProgramacion);
console.log("Libros de Programación:");
console.log(librosProgramacion);

// ! X Año
const filtrarRecientes = crearFiltrador({ anio: 2020, operador: "mayor" });
const librosRecientes = libros.filter(filtrarRecientes);
console.log("\nLibros después de 2020:");
console.log(librosRecientes);

// ? Ejemplo B: Función como parámetro
console.log("\n=== Ejemplo B: Función como parámetro ===\n");

// Estrategia 1: Calcular multas
const calcularMultas = (prestamo) => {
	const multaPorDia = 0.5;
	return {
		...prestamo,
		multa: prestamo.diasRetraso * multaPorDia,
	};
};

// Estrategia 2: Enviar recordatorios
const enviarRecordatorios = (prestamo) => {
	return {
		...prestamo,
		recordatorio: prestamo.activo ? "Enviar recordatorio" : "No enviar",
	};
};

const prestamosConMultas = procesarPrestamos(prestamos, calcularMultas);
console.log("Préstamos con multas:");
console.log(prestamosConMultas);

const prestamosConRecordatorios = procesarPrestamos(prestamos, enviarRecordatorios);
console.log("\nPréstamos con recordatorios:");
console.log(prestamosConRecordatorios);

