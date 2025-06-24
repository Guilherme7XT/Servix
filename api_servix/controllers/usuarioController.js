import Usuario from '../models/Usuario.js';

export async function criarUsuario(req, res) {
  try {
    const novo = await Usuario.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function listarUsuarios(req, res) {
  const lista = await Usuario.findAll();
  res.json(lista);
}