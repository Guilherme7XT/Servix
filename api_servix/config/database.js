import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('servix_db', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;