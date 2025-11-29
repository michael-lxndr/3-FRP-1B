function calcularDiasRetraso(fechaPrestamo, fechaDevolucion, diasPermitidos) {
	const fechaInicio = new Date(fechaPrestamo);
	const fechaFin = new Date(fechaDevolucion);

	const diferenciaMs = fechaFin.getTime() - fechaInicio.getTime();

	const diasTranscurridos = diferenciaMs / (1000 * 60 * 60 * 24);

	return Math.max(0, diasTranscurridos - diasPermitidos);
}

function calcularMulta(diasRetraso) {
	return diasRetraso * 0.50;
}

const fechaPrestamo = "2024-01-01";
const fechaDevolucion = "2024-01-20";
const diasPermitidos = 14;

const diasRetraso = calcularDiasRetraso(fechaPrestamo, fechaDevolucion, diasPermitidos);
if (diasRetraso === 0) {
	console.log("No hay días de retraso.");
} else {
	const multa = calcularMulta(diasRetraso);
	console.log(`Días de Retraso: ${diasRetraso}`);
	console.log(`Multa: $${multa.toFixed(2)}`);
}
