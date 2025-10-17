import Usuario from './Usuario.js';
import Servico from './Servico.js';
import Agendamento from './Agendamento.js';

// Relacionamentos
Usuario.hasMany(Servico, { 
  foreignKey: 'prestadorId', 
  as: 'servicos' 
});

Servico.belongsTo(Usuario, { 
  foreignKey: 'prestadorId', 
  as: 'prestador' 
});

Usuario.hasMany(Agendamento, { 
  foreignKey: 'usuarioId', 
  as: 'agendamentos' 
});

Agendamento.belongsTo(Usuario, { 
  foreignKey: 'usuarioId', 
  as: 'usuario' 
});

Servico.hasMany(Agendamento, { 
  foreignKey: 'servicoId', 
  as: 'agendamentos' 
});

Agendamento.belongsTo(Servico, { 
  foreignKey: 'servicoId', 
  as: 'servico' 
});

export { Usuario, Servico, Agendamento };
