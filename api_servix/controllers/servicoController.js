import Servico from '../models/Servico.js';

export async function criarServico(req, res) {
  try {
    const { titulo, descricao, preco, prestadorId, categoria } = req.body;

    // Validações básicas
    if (!titulo || !descricao || !preco || !prestadorId) {
      return res.status(400).json({ erro: 'Título, descrição, preço e prestadorId são obrigatórios' });
    }

    if (parseFloat(preco) <= 0) {
      return res.status(400).json({ erro: 'Preço deve ser maior que zero' });
    }

    const novo = await Servico.create({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      preco: parseFloat(preco),
      prestadorId: parseInt(prestadorId),
      categoria: categoria?.trim()
    });
    
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function listarServicos(req, res) {
  try {
    const lista = await Servico.findAll();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function buscarServicoPorId(req, res) {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    res.json(servico);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function atualizarServico(req, res) {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    await servico.update(req.body);
    res.json(servico);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function deletarServico(req, res) {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    await servico.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
