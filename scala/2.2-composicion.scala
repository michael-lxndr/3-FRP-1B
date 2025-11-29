case class Libro(
    id: Int,
    titulo: String,
    precio: Double,
    descuento: Double = 0,
    impuesto: Double = 0
)

// Define funciones de transformación (0.3 puntos)
val aplicarDescuento: Libro => Libro = libro => {
  // Aplica 15% de descuento sobre el precio
  val precioConDescuento = libro.precio * 0.85
  libro.copy(precio = precioConDescuento, descuento = 0.15) // Es scala esto es el return
}

val aplicarImpuesto: Libro => Libro = libro => {
  // Aplica 12% de IVA sobre el precio actual (ya con descuento)
  val precioConImpuesto = libro.precio * 1.12
  libro.copy(precio = precioConImpuesto, impuesto = 0.12)
}

val redondearPrecio: Libro => Libro = libro => {

  // Redondea el precio a 2 decimales
  val precioRedondeado = BigDecimal(libro.precio).setScale(2, BigDecimal.RoundingMode.HALF_UP).toDouble
  libro.copy(precio = precioRedondeado)
}

// Usa composición de funciones (0.4 puntos)
// andThen: aplica las funciones en orden secuencial (izquierda a derecha)
val procesarPrecioFinal = aplicarDescuento andThen aplicarImpuesto andThen redondearPrecio

// Aplica a lista de libros
val libros = List(
  Libro(1, "Clean Code", 45.99),
  Libro(2, "Refactoring", 39.99)
)



// map: aplica la función compuesta a cada libro de la lista
val librosConPrecioFinal = libros.map(procesarPrecioFinal)

@main def main(): Unit = {
  println("Libros originales:")
  libros.foreach(println)

  println("\nLibros con precio final (descuento + IVA):")
  librosConPrecioFinal.foreach(libro => {
    println(s"${libro.titulo}: $$${libro.precio} (Descuento: ${libro.descuento * 100}%, IVA: ${libro.impuesto * 100}%)")
  })
}

/*
 ? ¿Qué ventaja tiene la composición vs un solo método grande?
 *
 # 1. MODULARIDAD: Cada función hace una sola cosa (principio de responsabilidad única)
 *    - aplicarDescuento solo aplica descuento
 *    - aplicarImpuesto solo aplica impuesto
 *    - redondearPrecio solo redondea
 *
 # 2. REUTILIZACIÓN: Puedes usar las funciones individualmente en otros contextos
 *    - Ejemplo: aplicar solo descuento sin impuesto
 *
 # 3. FLEXIBILIDAD: Fácil cambiar el orden o agregar/quitar transformaciones
 *    - val otroProceso = aplicarImpuesto andThen redondearPrecio (sin descuento)
 *    - val proceso2 = aplicarDescuento andThen redondearPrecio andThen aplicarImpuesto
 *
 # 4. LEGIBILIDAD: El código expresa claramente qué hace y en qué orden
 *    - "procesarPrecioFinal" se lee como una secuencia clara de pasos
 *
 ? ¿Cómo facilita el testing?
 *
 # 1. TEST UNITARIO: Puedes probar cada función por separado
 *    - Test para aplicarDescuento(libro) => verifica que aplica 15%
 *    - Test para aplicarImpuesto(libro) => verifica que aplica 12%
 *    - Test para redondearPrecio(libro) => verifica redondeo a 2 decimales
 *
 # 2. TEST DE INTEGRACIÓN: Pruebas la composición completa
 *    - Test para procesarPrecioFinal(libro) => verifica resultado final
 *
 # 3. AISLAMIENTO: Si un test falla, sabes exactamente qué función tiene el problema
 *    - No necesitas debuggear un método grande con lógica mezclada
 *
 # 4. MOCKING: Es más fácil mockear funciones individuales si fuera necesario
 */
