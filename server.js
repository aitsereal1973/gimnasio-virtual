const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost/gimnasioVirtual', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Base de datos conectada'))
.catch(err => console.log(err));

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

app.get('/', (req, res) => {
  res.send('API de Gimnasio Virtual');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
