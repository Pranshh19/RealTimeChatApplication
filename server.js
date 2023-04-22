const express = require('express')
const app = express()

const http = require('http').createServer(app)

const PORT = process.env.port || 3000

http.listen(PORT, () => {
    
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


//Socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...');


    //Joh emit kri event client pr woh listen krenge idhr
    socket.on('message', (msg) => {
        socket.broadcast.emit('message',msg)
    })

    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name);
    });

    socket.on('stopTyping', (name) => {
        socket.broadcast.emit('stopTyping', name);
    });
})