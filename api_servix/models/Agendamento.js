import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado', 'concluido'),
    defaultValue: 'pendente'
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  servicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'servicos',
      key: 'id'
    }
  }
}, {
  tableName: 'agendamentos',
  timestamps: true
});

export default Agendamento;