import express from 'express';
import { login, register, refreshToken, logout } from '../controllers/authController.js';
import { validateLogin, validateUsuario } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.post('/login', validateLogin, login);
router.post('/register', validateUsuario, register);
router.post('/refresh', refreshToken);

// Rotas protegidas
router.post('/logout', authenticateToken, logout);

export default router;
