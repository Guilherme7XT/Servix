import express from 'express';
import { 
  criarUsuario, 
  listarUsuarios, 
  buscarUsuarioPorId, 
  atualizarUsuario, 
  deletarUsuario 
} from '../controllers/usuarioController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { validateUsuario, validateId } from '../middleware/validation.js';
import { createLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Rotas públicas (apenas criação de usuário)
router.post('/usuarios', createLimiter, validateUsuario, criarUsuario);

// Rotas protegidas
router.get('/usuarios', authenticateToken, listarUsuarios);
router.get('/usuarios/:id', authenticateToken, validateId, buscarUsuarioPorId);
router.put('/usuarios/:id', authenticateToken, validateId, validateUsuario, atualizarUsuario);
router.delete('/usuarios/:id', authenticateToken, requireRole(['admin']), validateId, deletarUsuario);

export default router;