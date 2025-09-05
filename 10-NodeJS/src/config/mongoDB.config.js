import mongoose from 'mongoose';
import ENVIRONMENT from './environment.config.js'; 

/* aca tenes que conectar la base local con la conection string, 
esto lo hacemos a traves de acceder al environment donde esta guardada 
la conection string por seguridad */

// hay que hacer una funcion async con mongoose para conectarse a esa string
async function connectMongoDB () {
    try {
        await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING, {
            timeourMS: 10000 // 10s
        })
        console.log('connection succeded')
    } 
    catch(error) {
        console.log('connection failed')
    }  
}

export default connectMongoDB
