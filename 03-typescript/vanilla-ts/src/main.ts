let saludo : string = 'Hola pepe'
console.log(saludo)

// 1)  que tome dos parámetros de tipo number y devuelva la suma de ambos.

// 2) que tome un parámetro de tipo string y devuelva el número de caracteres que contiene.

// 3) que tome un parámetro de tipo string y devuelva el mismo string pero con todas las letras en mayúscula.

// 4) que tome un array de números y devuelva la suma de todos los elementos.

// 5) que tome un array de objetos de tipo Persona y devuelva un nuevo arreglo con solo los nombres de cada persona.

// 6) Tomar como referencia el ejemplo de la clase GestorDeUsuario que maneja usuarios, y utilizar la interfaz Producto para crear una clase GestorDeProducto. Esta clase deberá gestionar una lista de productos, mostrar los productos y calcular el precio total de todos ellos.

// 7) crear un interfaz de tienda con nobre, dinero_en_cuenta, items_en_venta, id
// crear una tienda que tenga 5 items
// crear una funcion que se llame vender(tienda, id_item), que reciba esos dos parametros. 
// si el objeto no exisste lanzar un error por consola("error: item no existe")
// debera elimitar el item de la lista
// debera incrementar el dinero de la cuenta por el valor del item vendido. 


interface productInterface {
  name: string,
  price: number,
  productId: number,
}

interface store {
  name: string,
  budget: number,
  products: productInterface[],
};

const drugstoreProducts : productInterface[]= [
  {
    name: 'crackers',
    price: 100,
    productId: 1
  },
  {
    name: 'coke',
    price: 200,
    productId: 2
  },
  {
    name: 'chocolate',
    price: 300,
    productId: 3
  },
  {
    name: 'water',
    price: 230,
    productId: 4
  },
  {
    name: 'sandwich',
    price: 730,
    productId: 5
  }
]

const drugstore : store = {
  name: 'myStore',
  budget: 1000, 
  products: drugstoreProducts,
}

function findProduct(store: store, product_id : number) : null | productInterface {
  for (let product of store.products) {
    if (product.productId === product_id) {
      return product
    } 
    return null
  }
}

const sellProduct = (store : store, product_id: number) => {
    const productSelled : null | productInterface = findProduct(store, product_id)
    if(!productSelled) {
      console.log('product not found')
    }
}

sellProduct(drugstore, 4)