import { transport } from '../config/nodemailer'

type EmailType = {
  name: string
  email: string
  token: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: 'CashTracker <admin@cashtrackr.com>',
      to: user.email,
      subject: 'CashTracker - Confirma tu cuenta',
      html: `
        <p> Hola: ${user.name}, has creado tu cuenta en CashTrack, ya está casi lista </p>
        <p> Visita el siguiente enlace:</p>
        <a href="#">Confirmar cuenta</a>
        <p>E ingresa el código <b>${user.token}</b> </p>
      `,
    })

    console.log('Mensaje enviado ', email.messageId)
  }
}
