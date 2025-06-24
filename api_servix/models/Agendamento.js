import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Agendamento = sequelize.define('Agendamento', {
  data: DataTypes.DATE,
  usuarioId: DataTypes.INTEGER, // FK para usuário
  servicoId: DataTypes.INTEGER, // FK para serviço
});

export default Agendamento;