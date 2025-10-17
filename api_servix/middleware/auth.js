import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      erro: 'Token de acesso necessário',
      codigo: 'TOKEN_REQUIRED'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuário no banco para verificar se ainda existe
    const usuario = await Usuario.findByPk(decoded.userId, {
      attributes: { exclude: ['senha'] }
    });

    if (!usuario) {
      return res.status(401).json({ 
        erro: 'Usuário não encontrado',
        codigo: 'USER_NOT_FOUND'
      });
    }

    req.user = usuario;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        erro: 'Token expirado',
        codigo: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        erro: 'Token inválido',
        codigo: 'TOKEN_INVALID'
      });
    }

    return res.status(500).json({ 
      erro: 'Erro interno do servidor',
      codigo: 'INTERNAL_ERROR'
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.userId, {
      attributes: { exclude: ['senha'] }
    });
    req.user = usuario;
  } catch (error) {
    req.user = null;
  }

  next();
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        erro: 'Autenticação necessária',
        codigo: 'AUTH_REQUIRED'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        erro: 'Permissão insuficiente',
        codigo: 'INSUFFICIENT_PERMISSIONS'
      });
    }

    next();
  };
};
