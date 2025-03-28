import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: process.env.NODE_ENV === 'production' ? 5 : 1000,
    message: {"error" : "Has alcanzado el límite de peticiones"}
})