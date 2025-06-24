import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Servico = sequelize.define('Servico', {
  titulo: DataTypes.STRING,
  descricao: DataTypes.STRING,
  preco: DataTypes.FLOAT,
  prestadorId: DataTypes.INTEGER, // FK para usuário
});

export default Servico;