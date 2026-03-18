const express = require('express');
const sequelize = require('./database/db');
const cors = require('cors');
const livroControllers = require('./controllers/LivroControllers.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/livros', livroControllers);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com MySQL estabelecida.');

    await sequelize.sync(); // cria a tabela lá no banco de dados se não existir

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();