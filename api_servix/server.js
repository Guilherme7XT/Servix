import sequelize from './config/database.js';
import Usuario from './models/Usuario.js';
import Servico from './models/Servico.js';
import Agendamento from './models/Agendamento.js';
import usuarioRoutes from './routes/usuarioRoutes.js';


sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado 🎯'))
  .catch(err => console.error('Erro ao conectar no banco:', err));

app.use('/api', usuarioRoutes);