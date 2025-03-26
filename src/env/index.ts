import 'dotenv/config'
import { z } from 'zod'

// dentro de NODE_ENV - colocar os ambientes mais comuns das apps estarem rodando - development, test ou production
// process.env.DATABASE_URL -> acessar as propriedades dessa forma
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Invalid environment variables!', _env.error.format())
    throw new Error('Invalid environment variables.')
}

export const env = _env.data
