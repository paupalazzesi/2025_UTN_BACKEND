import UserRepository from "../repositories/user.repository.js";
import { ServerError } from "../utils/customError.utils.js";
import bcrypt from "bcrypt";
import transporter from "../config/mailer.config.js";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";

class AuthService {
  static async register(username, password, email) {
    console.log(username, password, email);

    //Verificar que el usuario no este repido
    const user_found = await UserRepository.getByEmail(email);
    if (user_found) {
      throw new ServerError(400, "Email ya en uso");
    }

    //Encriptar la contraseña
    const password_hashed = await bcrypt.hash(password, 12);

    //guardarlo en la DB
    const user_created = await UserRepository.createUser(
      username,
      email,
      password_hashed
    );
    /*
        los  methosos para crear json web token, lleva un objeto de informacion. 
        sign: se usa para firmar tokens, parametros: 
            - payload: carga util, el objeto q sera guardado dentro del token. No guardar informacion sensible.
            - secret or private key: clave para firmar, un sello (no es contraseña en si). Si te roban esta clave tus tokens son inseguros, 
            una buena practica es cambiarla cada algun tiempo. 
            - configuraciones le podes poner fecha de expiracion 
        */
    const verification_token = jwt.sign(
      {
        email: email,
        user_id: user_created._id,
      },
      ENVIRONMENT.JWT_KEY
    );

    //Enviar un mail de verificacion
    await transporter.sendMail({
      from: "mariapaula.p02@gmail.com",
      to: "mariapaula.p02@gmail.com",
      subject: "Verificacion de correo electronico",
      html: `
            <h1>Hola desde node.js</h1>
            <p>Este es un mail de verificacion</p>
            <a href='http://localhost:8080/api/auth/verify-email/${verification_token}'>Verificar email</a>
            `,
    });
  }

  static async verifyEmail(verification_token) {
    try {
      // llamar al methodo verify para chequear si el verification token es el nuestro key.
      const payload = jwt.verify(verification_token, ENVIRONMENT.JWT_KEY);
      UserRepository.UpdateByID(payload.user_id, {
        verified_email: true,
      });

      return;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ServerError(400, "token invalido");
      }
      throw error;
    }
  }
  
  static async login(email, password) {
    /*
    - se busca por email y guardar en una variable
        - si no se encuentra: es un 404 'Email no resgistrado' o 'email o contraseña invalida' tmb para no blanquear que el otro email esta registrado
        - se encontro y:
            - comparamos con bcryp.compare para chequear que la pass recibida sea igual a la hash en db
                - puede ser verdadera
                - o falso: 401 unauthorized 'email o contraseña invalida'
        - generar el authorization token con los datos q consideermos importantes para una sesion: ej: name, email, rol, created_at, themes, preferencias, idioma 
        - retornar el token       
    */
    try {
        const user = await UserRepository.getByEmail(email) 
        if(!user) {
            throw new ServerError(404, 'Email no registrado')
        }  
        const isValidPass = await bcrypt.compare(password, user.password)
        if(!isValidPass) {
            throw new ServerError(401, 'contraseña invalida')
        }     
        const authorization_token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at                
            },
            ENVIRONMENT.JWT_KEY,
            {
                expiresIn: '7d'
            }
        )
        return {
            authorization_token
        }
    } catch (error) {
        
    }



  }

}

export default AuthService;
