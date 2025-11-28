case class Product(name: String, price: Double, stock: Int)

val products = List(
  Product("Laptop", 1200, 30),
  Product("Tablet", 500, 10),
  Product("Headphones", 200, 5),
  Product("Keyboard", 150, 50),
  Product("Mouse", 100, 15),
  Product("Charger", 25, 100)
)

def filterProduct(
    products: List[Product],
    criterion: Product => Boolean
): List[Product] = products.filter(criterion)

@main def main(): Unit =
  //	(filtrado)
  val expensiveProducts = filterProduct(products, p => p.price >= 450)
  println(s"Productos caros son:")
  for (p, i) <- expensiveProducts.zipWithIndex do
    println(s"${i + 1}. ${p.name}")
  println()

  // (transformación)
  val productNames: List[String] = products.map(p => p.name)
  println(s"Nombres de productos: $productNames")

  // (agregación)
  val totalStock: Int = products.map(_.stock).sum
  val subStock: Double = products.map(_.price).reduce((a, v) => a - v)
  val totalPrices: Double = products.map(_.price).reduce((a, v) => a - v)
  println(s"Stock total: $totalStock")
  println(s"Stock total: $subStock")
  println(s"Total gross earnings: $totalPrices")
