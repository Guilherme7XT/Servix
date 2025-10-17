import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Servico = sequelize.define('Servico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  prestadorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'servicos',
  timestamps: true
});

export default Servico;