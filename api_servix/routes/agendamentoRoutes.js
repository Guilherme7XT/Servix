import express from 'express';
import { 
  criarAgendamento, 
  listarAgendamentos, 
  buscarAgendamentoPorId, 
  atualizarAgendamento, 
  deletarAgendamento 
} from '../controllers/agendamentoController.js';

const router = express.Router();

router.post('/agendamentos', criarAgendamento);
router.get('/agendamentos', listarAgendamentos);
router.get('/agendamentos/:id', buscarAgendamentoPorId);
router.put('/agendamentos/:id', atualizarAgendamento);
router.delete('/agendamentos/:id', deletarAgendamento);

export default router;
