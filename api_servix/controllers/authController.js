import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';

// Gerar tokens JWT
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Login
export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    // Buscar usuário
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({
        erro: 'Credenciais inválidas',
        codigo: 'INVALID_CREDENTIALS'
      });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({
        erro: 'Credenciais inválidas',
        codigo: 'INVALID_CREDENTIALS'
      });
    }

    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(usuario.id);

    // Atualizar último login
    await usuario.update({ ultimoLogin: new Date() });

    // Retornar dados do usuário (sem senha) e tokens
    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
    
    res.json({
      usuario: usuarioSemSenha,
      accessToken,
      refreshToken,
      expiresIn: 900 // 15 minutos em segundos
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      erro: 'Erro interno do servidor',
      codigo: 'INTERNAL_ERROR'
    });
  }
}

// Registro
export async function register(req, res) {
  try {
    const { nome, email, senha, telefone, endereco } = req.body;

    // Verificar se email já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({
        erro: 'Email já cadastrado',
        codigo: 'EMAIL_ALREADY_EXISTS'
      });
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 12);

    // Criar usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      telefone,
      endereco,
      role: 'user' // Role padrão
    });

    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(novoUsuario.id);

    // Retornar dados do usuário (sem senha) e tokens
    const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();
    
    res.status(201).json({
      usuario: usuarioSemSenha,
      accessToken,
      refreshToken,
      expiresIn: 900
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      erro: 'Erro interno do servidor',
      codigo: 'INTERNAL_ERROR'
    });
  }
}

// Refresh token
export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        erro: 'Refresh token necessário',
        codigo: 'REFRESH_TOKEN_REQUIRED'
      });
    }

    // Verificar refresh token
    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        erro: 'Token inválido',
        codigo: 'INVALID_TOKEN_TYPE'
      });
    }

    // Verificar se usuário ainda existe
    const usuario = await Usuario.findByPk(decoded.userId);
    if (!usuario) {
      return res.status(401).json({
        erro: 'Usuário não encontrado',
        codigo: 'USER_NOT_FOUND'
      });
    }

    // Gerar novos tokens
    const tokens = generateTokens(usuario.id);

    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: 900
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        erro: 'Refresh token expirado',
        codigo: 'REFRESH_TOKEN_EXPIRED'
      });
    }

    console.error('Erro no refresh token:', error);
    res.status(500).json({
      erro: 'Erro interno do servidor',
      codigo: 'INTERNAL_ERROR'
    });
  }
}

// Logout
export async function logout(req, res) {
  try {
    // Em uma implementação mais robusta, você adicionaria o token a uma blacklist
    // Por enquanto, apenas retornamos sucesso
    res.json({
      mensagem: 'Logout realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({
      erro: 'Erro interno do servidor',
      codigo: 'INTERNAL_ERROR'
    });
  }
}
