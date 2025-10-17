import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [5, 255]
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255]
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [10, 20]
    }
  },
  endereco: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 500]
    }
  },
  role: {
    type: DataTypes.ENUM('user', 'prestador', 'admin'),
    defaultValue: 'user',
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  ultimoLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tentativasLogin: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  bloqueadoAte: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['role']
    },
    {
      fields: ['ativo']
    }
  ]
});

export default Usuario;