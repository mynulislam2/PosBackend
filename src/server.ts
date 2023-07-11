import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { SuccessLogger, ErrorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  ErrorLogger.error(error)
  process.exit(1)
})
let server: Server
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    SuccessLogger.info(`🛢   Database is connected successfully`)

    server = app.listen(config.port, () => {
      SuccessLogger.info(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    ErrorLogger.error('Failed to connect database', err)
  }
  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        ErrorLogger.error(error)
        process.exit(1)

      })
    }
    else {
      process.exit(1)

    }
  })
}

boostrap()
process.on('SIGTERM', () => {
  SuccessLogger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})