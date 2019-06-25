const express = require('express')
const consola = require('consola')
const redis = require('redis');
const http = require('http');

const sub = redis.createClient()
const {
    Nuxt,
    Builder
} = require('nuxt')
const app = express()
const server = http.createServer(app);
const io = require('socket.io').listen(server);
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const {
        host,
        port
    } = nuxt.options.server

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    server.listen(port, host)

    sub.subscribe('tweets');
    io.on('connection', socket => {
        sub.on("message", function(channel, message) {
            console.log(message)
            socket.emit('tweet', message)

        });

    })
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()
