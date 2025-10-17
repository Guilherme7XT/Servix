import rateLimit from 'express-rate-limit';

// Rate limiter para autenticação (mais restritivo)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas por IP
  message: {
    erro: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    codigo: 'TOO_MANY_ATTEMPTS'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // não contar requisições bem-sucedidas
});

// Rate limiter para criação de recursos
export const createLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 criações por minuto
  message: {
    erro: 'Muitas tentativas de criação. Tente novamente em 1 minuto.',
    codigo: 'TOO_MANY_CREATES'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter geral para API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requisições por IP
  message: {
    erro: 'Muitas requisições. Tente novamente em 15 minutos.',
    codigo: 'TOO_MANY_REQUESTS'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para endpoints sensíveis
export const sensitiveLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // máximo 3 tentativas por minuto
  message: {
    erro: 'Muitas tentativas em endpoint sensível. Tente novamente em 1 minuto.',
    codigo: 'SENSITIVE_ENDPOINT_LIMIT'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
