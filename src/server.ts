import { app } from './app'
import { env } from './env'
// import { knex } from './database'

app
  .listen({
    port: env.PORT,
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  })
  .then(() => {
    console.log('HTTP Server running!')
  })
