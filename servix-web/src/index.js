const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const db = require('./models');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API da Servix Online 🚀');
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
