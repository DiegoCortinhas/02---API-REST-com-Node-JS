/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

// const app = require("fastify")({ logger: true });
export const app = fastify()

// GET POST PUT PATCH DELETE
// http://localhost:3333/hello
/* app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')
  return transaction
}) */

app.register(cookie)

app.register(transactionsRoutes, {
    prefix: 'transactions',
})
