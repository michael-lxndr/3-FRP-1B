# Reflexión: Programación Funcional en JavaScript y Scala

## 1. Comparación de Paradigmas

### Ventajas de la Programación Funcional

Durante el desarrollo de este sistema de gestión de biblioteca, la programación funcional demostró ventajas significativas. La **inmutabilidad** fue el concepto más impactante: en lugar de modificar datos existentes, siempre creé nuevas estructuras. Por ejemplo, en el ejercicio de inmutabilidad de Scala, usar `prestamos.map { prestamo => prestamo.copy(activo = false) }` garantiza que la lista original nunca cambia, eliminando errores difíciles de rastrear relacionados con estado compartido.

La **composición de funciones** simplificó enormemente el código complejo. En el ejercicio 2.2, separé el procesamiento de precios en tres funciones pequeñas (`aplicarDescuento`, `aplicarImpuesto`, `redondearPrecio`) y las combiné con `andThen`. Esto es superior a un método monolítico porque cada función tiene una responsabilidad única y es fácil de probar y reutilizar.

El uso de **funciones de orden superior** como `map`, `filter` y `reduce` hizo el código más declarativo. En vez de escribir loops explicando *cómo* hacer algo, expresé *qué* quiero lograr. Por ejemplo, `libros.filter(libro => !libro.prestado)` es más legible que un `for` con `if` anidados.

### Desafíos al Evitar la Mutación

El mayor desafío fue cambiar la mentalidad de "modificar en lugar" a "crear nuevo". Al principio, en el ejercicio 1.5, mi instinto era usar `result.push()` dentro de un loop, pero tuve que pensar en términos de `reduce` construyendo un objeto acumulador inmutable.

Otro desafío fue el rendimiento percibido: crear nuevas estructuras parece ineficiente. Sin embargo, aprendí que operaciones como `map` y `filter` están optimizadas internamente, y la inmutabilidad facilita optimizaciones del compilador y runtime.

La sintaxis también fue un obstáculo inicial. Expresiones como `Object.entries(objeto).map(([key, value]) => ...)` requieren entender destructuring y cómo convertir entre objetos y arrays. Con práctica, estas técnicas se volvieron naturales.

## 2. Análisis Crítico: ¿Cuándo Usar Cada Paradigma?

### Preferir Programación Funcional

La programación funcional brilla en:

- **Procesamiento de datos**: Transformar colecciones (filtrar libros, calcular estadísticas) es más limpio con `map`/`filter`/`reduce` que con loops imperativos.
- **Lógica de negocio sin estado**: Funciones puras como `calcularMulta(diasRetraso)` son predecibles y fáciles de testear.
- **Composición de operaciones**: Cadenas de transformaciones (`libros.filter(...).map(...).sort(...)`) expresan flujos de datos claramente.
- **Concurrencia**: Inmutabilidad elimina race conditions, crucial en sistemas multithread o asíncronos.

### Preferir Programación Imperativa

La imperativa es mejor para:

- **Algoritmos con estado complejo**: Algoritmos de grafos o juegos con estado mutable son más naturales imperativamente.
- **Optimización de rendimiento crítico**: Cuando cada operación cuenta (sistemas embebidos, gráficos), mutar en lugar puede ser más eficiente.
- **Interfaces con sistemas legacy**: Si trabajas con APIs que esperan mutación, forzar funcional puede ser contraproducente.
- **Lógica procedural simple**: Para scripts pequeños o tareas lineales, un `for` directo puede ser más claro que `reduce`.

En mi código, el ejercicio 1.1 comparó ambos paradigmas: la versión imperativa con loops anidados es más verbosa y propensa a errores, mientras que la funcional (`filter(...).sort(...)`) es concisa y clara. Esto refuerza que para procesamiento de datos, funcional es superior.

## 3. Comparación de Lenguajes: JavaScript vs Scala

### JavaScript

**Fortalezas:**
- **Flexibilidad**: JavaScript es multi-paradigma; puedes mezclar funcional, imperativo y orientado a objetos.
- **Ecosistema**: Métodos de arrays (`map`, `filter`, `reduce`) están incorporados y son ampliamente usados.
- **Accesibilidad**: Sintaxis familiar para muchos desarrolladores.

**Debilidades:**
- **No es puramente funcional**: Fácil caer en mutación accidental (arrays se mutan con `sort()` in-place).
- **Sin tipos estáticos**: Errores de tipos solo aparecen en runtime, complicando refactorizaciones grandes.
- **Consistencia**: Algunos métodos mutan (`push`), otros no (`concat`), causando confusión.

En mi código JavaScript, tuve que ser disciplinado: usar `slice()` antes de `sort()` para evitar mutación, y recordar que `reduce` puede construir cualquier tipo de estructura.

### Scala

**Fortalezas:**
- **Diseñado para funcional**: Inmutabilidad por defecto, pattern matching, tipos algebraicos (`case class`).
- **Sistema de tipos robusto**: Tipos estáticos previenen errores en compile-time. Tuplas con tipos explícitos `(Int, Int, Double)` son más seguras que arrays en JS.
- **Composición explícita**: `andThen` y `compose` hacen la composición de funciones clara y legible.

**Debilidades:**
- **Curva de aprendizaje**: Sintaxis más compleja (`.copy()`, pattern matching, tipos explícitos) requiere más estudio.
- **Verbosidad**: Definir tipos y estructuras es más largo que JavaScript dinámico.

**Veredicto**: Para sistemas grandes y críticos, **Scala es superior** por su seguridad de tipos y herramientas funcionales nativas. Para scripting rápido y prototipos, **JavaScript** es más ágil. En este proyecto, Scala forzó buenas prácticas (inmutabilidad, tipos) que en JavaScript dependen de la disciplina del programador.

## 4. Aplicación Práctica en Proyectos Reales

### Ejemplo 1: Sistema de E-commerce

Aplicaría composición de funciones para procesar órdenes:

```scala
val calcularSubtotal = orden => orden.copy(subtotal = orden.items.sum)
val aplicarDescuentoUsuario = orden => orden.copy(total = orden.subtotal * (1 - orden.usuario.descuento))
val aplicarImpuestos = orden => orden.copy(total = orden.total * 1.15)
val procesarOrden = calcularSubtotal andThen aplicarDescuentoUsuario andThen aplicarImpuestos
```

Cada función es testeable independientemente, y cambiar el orden o agregar pasos (descuento por cupón) es trivial.

### Ejemplo 2: Pipeline de Datos en Backend

Para un sistema de reportes, usaría `map`/`filter`/`reduce` en lugar de loops:

```javascript
const reporteMensual = transacciones
  .filter(t => t.fecha.mes === mesActual)
  .reduce((acc, t) => {
    acc[t.categoria] = (acc[t.categoria] || 0) + t.monto;
    return acc;
  }, {});
```

Esto es más legible y fácil de paralelizar (en Scala con `par` o en JS con Workers) que loops imperativos.

### Ejemplo 3: Testing y Validación

Las funciones puras facilitan unit testing. Mi función `calcularDiasRetraso(fecha1, fecha2, diasPermitidos)` no depende de estado global ni fecha actual, así que los tests son determinísticos:

```javascript
test('calcula retraso correctamente', () => {
  expect(calcularDiasRetraso("2024-01-01", "2024-01-20", 14)).toBe(5);
});
```

Sin efectos secundarios, mockear es innecesario.

### Ejemplo 4: Manejo de Estado en Frontend

En React o frameworks similares, la inmutabilidad previene bugs. En vez de `estado.push(item)`, uso `setState([...estado, item])`, garantizando que React detecta cambios y re-renderiza correctamente.

## Conclusión

La programación funcional transformó cómo pienso sobre código. Pasé de "modificar variables" a "transformar datos". Los conceptos aprendidos —inmutabilidad, composición, funciones puras— son aplicables universalmente, no solo en JavaScript y Scala. En proyectos futuros, priorizaré funcional para lógica de negocio y procesamiento de datos, reservando imperativo para casos específicos de rendimiento o estado complejo. Este ejercicio solidificó que el código funcional, aunque requiere práctica inicial, produce sistemas más mantenibles, testeables y confiables.
