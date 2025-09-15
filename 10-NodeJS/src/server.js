import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import Users from "./models/user.model.js";
import Workspace from "./models/workspace.model.js";
import UserRepository from "./repositories/user.repository.js";

connectMongoDB()

/* -------------------------------------------------------

You can call functions to insertOne() object only when calls function. 

function createUser(name, email, password) {
    Users.insertOne({
        name: name,
        email: email,
        password: password,
    })
}

function createWorkspace(name, url_image) {
    Workspace.insertOne({
        name: name,
        url_image: url_image
    })
}

--------------------------------------------- */

/* UserRepository.getAll().then(res => console.log(res))

Opcion 1 para probar codigo asincronico

async function accion(){
    const result = await UserRepository.updateById(
        '68b787a7f258a4c56cc13898', 
        {
            email: 'pedrito@gmail.com'
        }
    )
    console.log(result)
}

accion()

//Opcion 2 para probar codigo asincronico (no se usa tanto porque hace mucha anidacion)

UserRepository.updateById(
    '68b787a7f258a4c56cc1389', 
    {
        email: 'pedrito@gmail.com'
    }
)
//then es un metodo que se activara cuando se resuelva la promesa
.then(
    () => {
        console.log('hola')
    }
)

//catch es un metodo que se activara si falla la resolucion de una promesa
.catch(
    (razon_de_error) => {
        console.log('Error al actualizar', razon_de_error)
    }
)

------------------------------------------------------------------ */