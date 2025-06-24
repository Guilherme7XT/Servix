import express from 'express';
import { criarUsuario, listarUsuarios } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', criarUsuario);
router.get('/usuarios', listarUsuarios);

export default router;