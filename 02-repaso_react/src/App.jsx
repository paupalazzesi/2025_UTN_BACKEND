
import './App.css'

function App() {
  
  // Buscar data en una API
  //Hacer una consulta HTTP a una API y mostrar los resultados en pantalla
  // fetch() es una funcion asynch que permite hacer peticiones HTTP, 
  // retorna una promesa: tipo de objeto que representa la finalizacion o el fracaso de una operacion asincrona

  // async significa que la funcion retorna una promesa y nos habilita a usar await
  async function getPosts(){
    const URL_API_POSTS = 'https://jsonplaceholder.typicode.com/posts'
    const response = await fetch(URL_API_POSTS)
    console.log(response)
  }
  getPosts() // se ejecuta inmediatamente al cargar el componente

  console.log('esto se ejecuta antes de que se resuelva la promesa')

  return (
    <>
      <h1>Hola Mundo </h1>
    </>
  )
}

export default App
