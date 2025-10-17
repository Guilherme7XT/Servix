import helmet from 'helmet';
import cors from 'cors';

// Configuração do Helmet para headers de segurança
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Configuração do CORS mais restritiva
export const corsConfig = cors({
  origin: function (origin, callback) {
    // Lista de origens permitidas
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      // Adicione suas URLs de produção aqui
      // 'https://seuapp.com',
      // 'https://www.seuapp.com'
    ];

    // Permitir requisições sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400 // 24 horas
});

// Middleware para sanitização de dados
export const sanitizeInput = (req, res, next) => {
  // Função para sanitizar strings
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  };

  // Sanitizar body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }

  // Sanitizar query parameters
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitizeString(req.query[key]);
      }
    }
  }

  next();
};

// Middleware para logging de segurança
export const securityLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log de requisições suspeitas
  const logSuspiciousActivity = (reason) => {
    console.warn(`🚨 ATIVIDADE SUSPEITA: ${reason}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
      body: req.method !== 'GET' ? req.body : undefined
    });
  };

  // Verificar User-Agent suspeito
  const userAgent = req.get('User-Agent');
  if (!userAgent || userAgent.length < 10) {
    logSuspiciousActivity('User-Agent ausente ou muito curto');
  }

  // Verificar tentativas de SQL injection
  const suspiciousPatterns = [
    /union\s+select/i,
    /drop\s+table/i,
    /delete\s+from/i,
    /insert\s+into/i,
    /update\s+set/i,
    /script\s*>/i,
    /javascript:/i,
    /<script/i
  ];

  const checkForSuspiciousContent = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        for (const pattern of suspiciousPatterns) {
          if (pattern.test(obj[key])) {
            logSuspiciousActivity(`Padrão suspeito detectado: ${pattern}`);
            return true;
          }
        }
      }
    }
    return false;
  };

  if (checkForSuspiciousContent(req.body) || checkForSuspiciousContent(req.query)) {
    return res.status(400).json({
      erro: 'Requisição bloqueada por segurança',
      codigo: 'SECURITY_BLOCK'
    });
  }

  // Log de resposta
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';
    
    console[logLevel](`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`, {
      ip: req.ip,
      userAgent: userAgent,
      statusCode: res.statusCode,
      duration: duration
    });
  });

  next();
};

// Middleware para limitar tamanho de payload
export const limitPayloadSize = (maxSize = '10mb') => {
  return (req, res, next) => {
    const contentLength = parseInt(req.get('content-length') || '0');
    const maxSizeBytes = parseInt(maxSize) * 1024 * 1024; // Converter MB para bytes

    if (contentLength > maxSizeBytes) {
      return res.status(413).json({
        erro: 'Payload muito grande',
        codigo: 'PAYLOAD_TOO_LARGE'
      });
    }

    next();
  };
};
