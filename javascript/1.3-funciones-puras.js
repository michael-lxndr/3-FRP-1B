function calcularDiasRetraso(fechaPrestamo, fechaDevolucion, diasPermitidos) {
	const fechaInicio = new Date(fechaPrestamo);
	const fechaFin = new Date(fechaDevolucion);

	const diferenciaMs = fechaFin.getTime() - fechaInicio.getTime();

	// milisegundos a días
	// 1000ms * 60seg * 60min * 24hrs = milisegundos en un día
	const diasTranscurridos = diferenciaMs / (1000 * 60 * 60 * 24);

	return Math.max(0, diasTranscurridos - diasPermitidos);
}

function calcularMulta(diasRetraso) {
	return diasRetraso * 0.50;
}

const fechaPrestamo = "2024-01-01";
const fechaDevolucion = "2024-01-20";
const diasPermitidos = 20;
const diasRetraso = calcularDiasRetraso(fechaPrestamo, fechaDevolucion, diasPermitidos);
if (diasRetraso === 0) {
	return console.log("No hay días de retraso.");
}
const multa = calcularMulta(diasRetraso);
console.log(`Días de Retraso: ${diasRetraso}`);
console.log(`Multa: $${multa.toFixed(2)}`);

