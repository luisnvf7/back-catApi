/* Archivo de configuracion de la base de datos. */
import mongoose, { Connection, ConnectionOptions } from 'mongoose'
import config from './config/config'

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(config.db.URI, dbOptions)

const connection : Connection = mongoose.connection

connection.once('open', () => {
    console.log("connectado a mongodb")
})

connection.on('error', err => {
    console.log(err)
    process.exit(0)
})

export default mongoose