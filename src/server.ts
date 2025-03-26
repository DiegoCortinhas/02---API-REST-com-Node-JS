import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

// const app = require("fastify")({ logger: true });
const app = fastify()

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

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')
  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running!')
  })
