case class Libro(id: Int, titulo: String, autor: String, categoria: String)

class Biblioteca(libros: List[Libro]) {
  def buscarPorAutor(autor: String): List[Libro] = {
    // filter: devuelve nueva lista con solo los elementos que cumplen la condición
    libros.filter(libro => libro.autor == autor)
  }
}

object FuncionesBiblioteca {
  def buscarPorAutor(libros: List[Libro], autor: String): List[Libro] = {
    // filter: devuelve nueva lista con solo los elementos que cumplen la condición
    libros.filter(libro => libro.autor == autor)
  }
}

@main def main(): Unit = {
  val libros = List(
    Libro(1, "Clean Code", "Robert Martin", "Programacion"),
    Libro(2, "Refactoring", "Martin Fowler", "Programacion")
  )

  val biblioteca = new Biblioteca(libros)
  val resultado1 = biblioteca.buscarPorAutor("Robert Martin")
  println("Resultado con método (OOP):")
  println(resultado1)

  val resultado2 = FuncionesBiblioteca.buscarPorAutor(libros, "Robert Martin")
  println("\nResultado con función pura:")
  println(resultado2)
}
