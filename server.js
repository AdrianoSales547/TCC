const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para interpretar JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos do diretório atual
app.use(express.static(__dirname));

// Importa o módulo de rotas (app.js)
const routes = require('./app');

// Aplica as rotas definidas em app.js
app.use('/', routes);

// Servidor escutando na porta especificada
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
