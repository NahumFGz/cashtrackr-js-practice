import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

type TransportConfig = {
  host: string
  port: number
  auth: {
    user: string
    pass: string
  }
}

const config = (): TransportConfig => {
  return {
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT, //* El + convierte el string a number
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }
}

export const transport = nodemailer.createTransport(config())
