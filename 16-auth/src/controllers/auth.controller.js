import AuthService from "../services/auth.service.js"
import { ServerError } from "../utils/customError.utils.js"

class AuthController {

    static async register(request, response) {
           try {
            /* 
            Recibiremos un username, email, password
            Validar los 3 campos
            */
            const {
                username, 
                email, 
                password
            } = request.body

            if(!username){
                throw new ServerError(
                    400, 
                    'Debes enviar un nombre de usuario valido'
                )
            }
            else if(!email || !String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                throw new ServerError(
                    400, 
                    'Debes enviar un email valido'
                )
            }
            else if(!password || password.length < 8){
                throw new ServerError(
                    400, 
                    'Debes enviar una contraseña valida'
                )
            }
            await AuthService.register(username, password, email)

            response.json({
                ok: true,
                message: 'el usuario ' + username + ' se registro con exito'
            })
        }
        catch (error) {
            console.log(error)
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }
        }
    }

    static async login(request, response) {
        try {
            const {email, password } = request.body
            /*
            validar que el email y la pass sean correctas
            */          
            const { authorization_token } = await AuthService.login(email, password)
            response.json({
                ok: false,
                status: 200,
                message: 'logueado con exito', 
                data: {
                    authorization_token: authorization_token
                }
            })
        } catch (error) {
            console.log(error)
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            } 
        }
    }

    static async verifyEmail(request, response) {
        try {
            const {verification_token} = request.params
            await AuthService.verifyEmail(verification_token)
            response.json({
                ok: true,
                status: 200,
                message: 'usuario validado'
            })
        } catch (error) {            
            console.log(error)
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }        
        }
    }

}

export default AuthController