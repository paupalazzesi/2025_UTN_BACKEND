import dotenv from 'dotenv'

// carga todas las variables de entorno dentro de process.env
// es como la variable document del DOM, aca process es la que tiene toda la info.
dotenv.config()

// creamos una constante de facil acceso a mis variables de entorno
const ENVIRONMENT = {
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD  
}

export default ENVIRONMENT