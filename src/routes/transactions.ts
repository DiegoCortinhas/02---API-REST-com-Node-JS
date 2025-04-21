/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', async () => {
        const transactions = await knex('transactions').select()
        return {
            transactions,
        }
    })

    // https://localhost:3333/transactions/id
    app.get('/:id', async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)
        const transaction = await knex('transactions').where('id', id).first()
        return { transaction }

    })


    app.post('/', async (request, reply) => {
        // {title, amount, type: credit or debit}
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })
        const { title, amount, type } = createTransactionBodySchema.parse(
            request.body,
        )
        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        })

        // Limitação do query builder -> não tem inteligencia de sugerir quais campos existem no BD
        // utilizar ORM - automatiza BD

        // HTTP Codes ()
        // 201 recurso criado com sucesso

        return reply.status(201).send()
    })
}
