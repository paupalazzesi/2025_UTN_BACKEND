import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import workspace_router from "./routes/workspace.route.js";

import UserRepository from "./repositories/user.repository.js";
import { validarId } from "./utils/validations.utils.js";

connectMongoDB()

/*------------------------------------------------*/

import express from 'express'

//Crear una aplicacion de express (Un servidor web)
const app = express()

//Hablilitamos el envio de JSON, Sino esta esta opcion NO nos pueden enviar JSON
//middleware, cada vez que me llegue una consulta checkearemos si es JSON y la parsearemos a un objeto de JS
app.use(express.json())

//Configuramos el enrutador: hace que todas las consultas que empiezen con /api/workspace se delegen al workspace_router
app.use('/api/workspace', workspace_router)

app.listen(
    8080, 
    () => {
        console.log("Esto esta funcionado en el puerto 8080")
    }
)


/*-------------------------------------------*/


//TODO - LLEVAR A SU ROUTER
// Ejercicio con user by id:

app.get(
    '/users/:user_id',
    async ( request, response ) =>{     
              
        const user_id = request.params.user_id
        console.log('El valor de id de user a buscar es', user_id)

        if(validarId(user_id)){
            const user_found = await UserRepository.getByID(user_id)
            if(!user_found){
                return response.json(
                    {
                        ok: false,
                        message: `User con id ${user_id} no encontrado`
                    }
                )
            }
            else{
                return response.json(
                    {
                        ok: true,
                        message: `User con id ${user_id} obtenido`,
                        data: {
                            user: user_found                        }
                    }
                )
            }
        }
        else{
            return response.json(
                {
                    ok: false,
                    message: 'user_id debe ser un id valido'
                }
            )
        } 
    }
)
