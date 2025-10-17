import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';

export async function criarUsuario(req, res) {
  try {
    const { nome, email, senha, telefone, endereco } = req.body;

    // Validações básicas
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }

    if (senha.length < 6) {
      return res.status(400).json({ erro: 'A senha deve ter pelo menos 6 caracteres' });
    }

    // Verificar se email já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const novo = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      telefone,
      endereco
    });

    // Não retornar a senha
    const { senha: _, ...usuarioSemSenha } = novo.toJSON();
    res.status(201).json(usuarioSemSenha);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function listarUsuarios(req, res) {
  try {
    const lista = await Usuario.findAll({
      attributes: { exclude: ['senha'] } // Excluir senha da resposta
    });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function buscarUsuarioPorId(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['senha'] }
    });
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function atualizarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const { senha, ...dadosAtualizacao } = req.body;
    
    // Se senha for fornecida, criptografar
    if (senha) {
      dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.update(dadosAtualizacao);
    
    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
    res.json(usuarioSemSenha);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

export async function deletarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    await usuario.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}