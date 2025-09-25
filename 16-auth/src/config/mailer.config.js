import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

// es como el obejto de conection, 
// pero transporta la configuracion de nuestro mail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mariapaula.p02@gmail.com",
        pass: ENVIRONMENT.GMAIL_PASSWORD
    }
})

export default transporter