import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import sequelize from './config/database.js';
import './models/associations.js'; // Importa os relacionamentos

// Middlewares de segurança
import { helmetConfig, corsConfig, sanitizeInput, securityLogger, limitPayloadSize } from './middleware/security.js';
import { apiLimiter, authLimiter, createLimiter } from './middleware/rateLimiter.js';

// Rotas
import usuarioRoutes from './routes/usuarioRoutes.js';
import servicoRoutes from './routes/servicoRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Trust proxy para rate limiting funcionar corretamente
app.set('trust proxy', 1);

// Middlewares de segurança
app.use(helmetConfig);
app.use(corsConfig);
app.use(compression());
app.use(morgan('combined'));
app.use(securityLogger);
app.use(limitPayloadSize('10mb'));

// Rate limiting
app.use('/api', apiLimiter);

// Middlewares básicos
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// Rotas
app.get('/', (req, res) => res.send('API do Servix online 🚀'));

// Rotas de autenticação (com rate limiting específico)
app.use('/api/auth', authLimiter, authRoutes);

// Rotas protegidas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Sincronização do banco
sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado 🎯'))
  .catch(err => console.error('Erro ao conectar no banco:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));