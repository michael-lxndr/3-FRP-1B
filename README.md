# Evaluación Programación Funcional

## 📋 Información del Estudiante
- **Nombre:** Michael Alexander Paccha Morocho
- **Cédula/ID:** 1105976888
- **Fecha:** 29 de Noviembre de 2025
- **Repositorio GitHub:** [github.com/michael-lxndr](https://github.com/michael-lxndr/3-FRP-1B)

---

## 🔧 Requisitos Previos

### Dependencias del Sistema

#### Para JavaScript:
- **Node.js v18+** (recomendado v20+)
  - Verificar instalación: `node --version`
  - Descargar desde: https://nodejs.org/

#### Para Scala:
- **Java JDK 11+** (recomendado JDK 17 o 21)
  - Verificar instalación: `java -version`
  - Descargar desde: https://adoptium.net/

- **scala-cli** (herramienta de compilación y ejecución)
  - Verificar instalación: `scala-cli version`
  - Instalación en Windows (PowerShell):
    ```powershell
    # Con Scoop
    scoop install scala-cli

    # O con Chocolatey
    choco install scala-cli
    ```

### Extensiones Recomendadas para VS Code

#### JavaScript:
- [**Code Runner**](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
  - Permite ejecutar archivos JS con un clic

#### Scala:
- [**Scala (Metals)**](https://marketplace.visualstudio.com/items?itemName=scalameta.metals)
  - Soporte completo para Scala con IntelliSense
- [**Scala Syntax (Official)**](https://marketplace.visualstudio.com/items?itemName=scala-lang.scala)
  - Resaltado de sintaxis oficial
- [**Scala Extension Pack**](https://marketplace.visualstudio.com/items?itemName=ravioshankar.scala-gurus)
  - Pack completo de herramientas Scala

---

## 📁 Estructura del Proyecto

```
1B/
├── javascript/                   # Ejercicios en JavaScript
│   ├── 1.1-paradigmas.js         # Comparación imperativo vs declarativo
│   ├── 1.3-funciones-puras.js    # Funciones puras y sin efectos secundarios
│   ├── 1.5-operaciones-listas.js # Map, filter, reduce sobre colecciones
│   ├── 2.1-orden-superior.js     # Closures y funciones de orden superior
│   └── 2.3-recomendaciones.js    # Sistema de recomendación funcional
│
├── scala/										# Ejercicios en Scala
│   ├── 1.2-inmutabilidad.scala   		# Transformaciones inmutables
│   ├── 1.4-funciones-vs-metodos.scala	# Comparación funciones/métodos
│   ├── 2.2-composicion.scala     		# Composición de funciones con andThen
│   └── 2.4-tuplas-analisis.scala 		# Tuplas y análisis funcional
│
├── README.md                      # Este archivo
└── REFLEXION.md                   # Análisis crítico y reflexión
```

---

## 🚀 Instrucciones de Ejecución

### Ejecutar Ejercicios JavaScript

#### Opción 1: Desde la terminal
```bash
# Navegar a la carpeta del proyecto
cd "c:\Workspace\U\3\F&RP\Exams\1B"

# Ejecutar un archivo específico
node javascript/1.1-paradigmas.js
node javascript/1.3-funciones-puras.js
node javascript/1.5-operaciones-listas.js
node javascript/2.1-orden-superior.js
node javascript/2.3-recomendaciones.js
```

#### Opción 2: Con Code Runner (VS Code)
1. Abrir el archivo `.js`
2. Click derecho → "Run Code"
3. O usar el atajo: `Ctrl + Alt + N`

### Ejecutar Ejercicios Scala

#### Opción 1: Desde la terminal
```bash
# Navegar a la carpeta scala
cd "c:\Workspace\U\3\F&RP\Exams\1B\scala"

# Ejecutar con scala-cli
scala-cli run 1.2-inmutabilidad.scala
scala-cli run 1.4-funciones-vs-metodos.scala
scala-cli run 2.2-composicion.scala
scala-cli run 2.4-tuplas-analisis.scala
```

#### Opción 2: Con Code Runner (VS Code)
1. Abrir el archivo `.scala`
2. Click derecho → "Run Code"
3. O usar el atajo: `Ctrl + Alt + N`

> **Nota:** Code Runner debe estar configurado para Scala. Agregar en `settings.json`:
> ```json
> "code-runner.executorMap": {
>   "scala": "clear && cd $dir && scala-cli run $fileName"
> }
> ```

---

## 📝 Descripción de Ejercicios

### FASE 1: Fundamentos (3.5 puntos)

#### JavaScript:
- **1.1-paradigmas.js** (0.8 pts)
  - Implementación imperativa vs declarativa
  - Filtrado y ordenamiento de libros

- **1.3-funciones-puras.js** (0.8 pts)
  - Cálculo de días de retraso
  - Cálculo de multas (funciones determinísticas)

- **1.5-operaciones-listas.js** (0.6 pts)
  - Reporte completo usando map/filter/reduce
  - Estadísticas de biblioteca sin loops

#### Scala:
- **1.2-inmutabilidad.scala** (0.7 pts)
  - Actualización de préstamos sin mutación
  - Uso de `map` y `copy`

- **1.4-funciones-vs-metodos.scala** (0.6 pts)
  - Comparación de métodos OOP vs funciones puras
  - Búsqueda por autor de dos formas

### FASE 2: Aplicación Avanzada (3.0 puntos)

#### JavaScript:
- **2.1-orden-superior.js** (0.5 pts)
  - Closures y filtros personalizados
  - Funciones como parámetros

- **2.3-recomendaciones.js** (0.6 pts)
  - Sistema de recomendación de libros
  - Cálculo de score (popularidad + recencia + rating)

#### Scala:
- **2.2-composicion.scala** (0.5 pts)
  - Composición de funciones con `andThen`
  - Transformaciones de precios (descuento → IVA → redondeo)

- **2.4-tuplas-analisis.scala** (0.4 pts)
  - Estadísticas con tuplas
  - Desestructuración y operaciones funcionales

#### Reflexión:
- **REFLEXION.md** (1.0 pts)
  - Análisis crítico de paradigmas
  - Comparación JavaScript vs Scala
  - Aplicaciones prácticas

---

## 💡 Conceptos Clave Implementados

### Programación Funcional:
- ✅ **Inmutabilidad**: Transformaciones sin mutar datos originales
- ✅ **Funciones Puras**: Mismo input = mismo output, sin efectos secundarios
- ✅ **Composición**: Encadenar funciones pequeñas (`andThen`)
- ✅ **Funciones de Orden Superior**: Funciones que reciben/retornan funciones
- ✅ **Declarativo vs Imperativo**: `map/filter/reduce` vs `for/while`

### JavaScript:
- Closures y scope léxico
- Spread operator para inmutabilidad
- Destructuring de arrays y objetos
- `Object.entries()` para transformar objetos en arrays

### Scala:
- `case class` y pattern matching
- `copy` para crear instancias modificadas
- Tuplas y desestructuración
- `andThen` para composición de funciones

---

## 📚 Recursos Adicionales

- **Documentación Scala:** https://docs.scala-lang.org/
- **Scala-cli Docs:** https://scala-cli.virtuslab.org/
- **MDN JavaScript:** https://developer.mozilla.org/es/docs/Web/JavaScript
- **Programación Funcional JS:** https://github.com/MostlyAdequate/mostly-adequate-guide

---

## ⚠️ Notas Importantes

1. **Todos los archivos ejecutan sin errores** - Verificados con Node.js v20 y Scala 3.7.4
2. **No se usan loops** en ejercicios funcionales - Solo `map`, `filter`, `reduce`, `sort`
3. **Inmutabilidad garantizada** - Uso de `slice()`, spread operator, `copy()`
4. **Código comentado** - Explicaciones de métodos y lógica compleja
5. **Ejemplos de datos incluidos** - Cada archivo tiene datos de prueba

---

## 👤 Autor

**Michael Alexander Paccha Morocho**
- Cédula: 1105976888
- Fecha: 29/11/2025
- GitHub: [github.com/michael-lxndr](https://github.com/michael-lxndr/3-FRP-1B)
