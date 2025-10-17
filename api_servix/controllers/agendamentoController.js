import Agendamento from '../models/Agendamento.js';
import Usuario from '../models/Usuario.js';
import Servico from '../models/Servico.js';

export async function criarAgendamento(req, res) {
  try {
    const novo = await Agendamento.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function listarAgendamentos(req, res) {
  try {
    const lista = await Agendamento.findAll({
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Servico, as: 'servico' }
      ]
    });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function buscarAgendamentoPorId(req, res) {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id, {
      include: [
        { model: Usuario, as: 'usuario' },
        { model: Servico, as: 'servico' }
      ]
    });
    if (!agendamento) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    res.json(agendamento);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function atualizarAgendamento(req, res) {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    await agendamento.update(req.body);
    res.json(agendamento);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function deletarAgendamento(req, res) {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    await agendamento.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
