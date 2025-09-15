import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import WorkspacesRepository from "./Repositories/workspace.repository.js";
import UserRepository from "./repositories/user.repository.js";
import mongoose from "mongoose";
import { validarId } from "./Utils/validations.utils.js";

connectMongoDB()

/*------------------------------------------------*/

// para llamar al repository y usar un metodo:
// UserRepository.createUser('pau', 'paula@gmail.com', '234234')

/*------------------------------------------------*/

//Crear una aplicacion de express (Un servidor web)

import express from 'express'
import Users from "./models/user.model.js";
const app = express()

/*.listen() es un metodo para asignar un lugar donde nuestro servidor se estara ejecutando
--> Primer parametro: Numero de puerto donde se estara ejecutando el servidor
--> Segundo parametro:  una callback fn que se ejecutara si logra prender 
correctamente en esa direccion mi servidor */

app.listen(
    8080, 
    () => {
        console.log("Esto esta funcionado en el puerto 8080")
    }
)

//ejemplo de consulta para ver en el browser poniendo localhost:8080:
app.get('/', (request, response) => {
    response.send('Hello World!')
})

/*-------------------------------------------*/

// Para traer toda la lista de Workspaces
app.get(
    '/workspaces', 
    async (request, response) => {
        const workspaces = await WorkspacesRepository.getAll()
        response.json(
            {
                status: 'OK',
                message: 'Lista de espacios de trabajo obtenida correctamente',
                data: {
                    workspaces: workspaces
                }
            }
        )
    }
)

//Para consultar por ID - Route param, URL param
app.get(
    '/workspaces/:workspace_id',
    async ( request, response ) =>{
        //Es un objeto donde estan los valores de parametro de busqueda
        //EJEMPLO:
        //Si la ruta es '/workspaces/:workspace_id'
        //Entonces request.params sera: {workspace_id: valor_workspace_id (siempre sera un string)}
        
        //paso 1 Capturar el ID
        const workspace_id = request.params.workspace_id
        console.log('El valor de id de workspace a buscar es', workspace_id)

        //paso 2: Validar el ID
        //IMPORTANTE, siempre la funcion que controla la consulta debe responder 
        if(validarId(workspace_id)){
            //paso 3: Buscamos en DB
            const workspace = await WorkspacesRepository.getById(workspace_id)
            //paso 4: Validamos si se encontro
            if(!workspace){
                return response.json(
                    {
                        ok: false,
                        message: `Workspace con id ${workspace_id} no encontrado`
                    }
                )
            }
            else{
                return response.json(
                    {
                        ok: true,
                        message: `Workspace con id ${workspace._id} obtenido`,
                        data: {
                            workspace: workspace
                        }
                    }
                )
            }
        }
        else{
            return response.json(
                {
                    ok: false,
                    message: 'workspace_id debe ser un id valido'
                }
            )
        } 
    }
)

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
