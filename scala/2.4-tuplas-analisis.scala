case class Prestamo(
    id: Int,
    libroId: Int,
    usuarioId: Int,
    fechaPrestamo: String,
    activo: Boolean
)

/**
  * Retorna estadísticas de un usuario usando tuplas Tupla: (totalPrestamos,
  * prestamosActivos, promedioLibrosPorMes)
  */
def obtenerEstadisticasUsuario(
    prestamos: List[Prestamo],
    usuarioId: Int
): (Int, Int, Double) = {
  // filter: filtra solo los préstamos del usuario específico
  val prestamosUsuario = prestamos.filter(p => p.usuarioId == usuarioId)

  // Total de préstamos del usuario
  val totalPrestamos = prestamosUsuario.length

  // filter: cuenta solo los préstamos activos
  val prestamosActivos = prestamosUsuario.filter(p => p.activo).length

  // Calcular promedio de libros por mes
  val promedioLibrosPorMes = if (prestamosUsuario.isEmpty) {
    0.0
  } else {
    // map: extrae solo las fechas de préstamo
    val fechas = prestamosUsuario.map(_.fechaPrestamo)

    // map: convierte fechas a meses únicos (formato "2024-01")
    val meses = fechas.map(fecha => fecha.substring(0, 7)).distinct

    // Calcular promedio: total de préstamos / cantidad de meses
    totalPrestamos.toDouble / meses.length
  }

  // Retornar tupla con las tres estadísticas
  (totalPrestamos, prestamosActivos, promedioLibrosPorMes)
}

// Ejemplo:
val prestamos = List(
  Prestamo(1, 101, 1, "2024-01-15", false),
  Prestamo(2, 102, 1, "2024-02-10", true),
  Prestamo(3, 103, 1, "2024-03-05", true),
  Prestamo(4, 104, 1, "2024-03-20", false),
  Prestamo(5, 105, 2, "2024-01-10", true),
  Prestamo(6, 106, 1, "2024-01-25", true)
)

@main def main(): Unit = {
  // Desestructuración de tupla: asigna cada elemento a una variable
  val (total, activos, promedio) = obtenerEstadisticasUsuario(prestamos, 1)

  println(s"Estadísticas del Usuario 1:")
  println(s"Total de préstamos: $total")
  println(s"Préstamos activos: $activos")
  println(s"Promedio de libros por mes: ${promedio}")

  println("\n" + "=" * 40)

  // También se puede acceder a los elementos de la tupla por índice
  val estadisticas = obtenerEstadisticasUsuario(prestamos, 1)
  println(s"\nAcceso por índice:")
  println(s"._1 (total): ${estadisticas._1}")
  println(s"._2 (activos): ${estadisticas._2}")
  println(s"._3 (promedio): ${estadisticas._3}")

  // Ejemplo con otro usuario
  val (total2, activos2, promedio2) = obtenerEstadisticasUsuario(prestamos, 2)
  println(s"\nEstadísticas del Usuario 2:")
  println(s"Total: $total2, Activos: $activos2, Promedio: $promedio2")
}
