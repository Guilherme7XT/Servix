import { body, param, validationResult } from 'express-validator';
import { sanitizeBody } from 'express-validator';

// Middleware para verificar erros de validação
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      codigo: 'VALIDATION_ERROR',
      detalhes: errors.array().map(error => ({
        campo: error.path,
        mensagem: error.msg,
        valor: error.value
      }))
    });
  }
  next();
};

// Validações para usuário
export const validateUsuario = [
  body('nome')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),
  
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email muito longo'),
  
  body('senha')
    .isLength({ min: 8 })
    .withMessage('Senha deve ter pelo menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'),
  
  body('telefone')
    .optional()
    .isMobilePhone('pt-BR')
    .withMessage('Telefone deve ser válido'),
  
  body('endereco')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Endereço muito longo'),
  
  sanitizeBody('*').escape(), // Sanitizar todos os campos
  handleValidationErrors
];

// Validações para serviço
export const validateServico = [
  body('titulo')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Título deve ter entre 3 e 100 caracteres'),
  
  body('descricao')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Descrição deve ter entre 10 e 1000 caracteres'),
  
  body('preco')
    .isFloat({ min: 0.01, max: 999999.99 })
    .withMessage('Preço deve ser um valor válido entre R$ 0,01 e R$ 999.999,99'),
  
  body('prestadorId')
    .isInt({ min: 1 })
    .withMessage('ID do prestador deve ser um número inteiro válido'),
  
  body('categoria')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Categoria muito longa'),
  
  sanitizeBody('*').escape(),
  handleValidationErrors
];

// Validações para agendamento
export const validateAgendamento = [
  body('data')
    .isISO8601()
    .withMessage('Data deve ser válida (formato ISO 8601)')
    .custom((value) => {
      const data = new Date(value);
      const agora = new Date();
      if (data <= agora) {
        throw new Error('Data deve ser futura');
      }
      return true;
    }),
  
  body('hora')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Hora deve estar no formato HH:MM'),
  
  body('usuarioId')
    .isInt({ min: 1 })
    .withMessage('ID do usuário deve ser um número inteiro válido'),
  
  body('servicoId')
    .isInt({ min: 1 })
    .withMessage('ID do serviço deve ser um número inteiro válido'),
  
  body('observacoes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Observações muito longas'),
  
  sanitizeBody('*').escape(),
  handleValidationErrors
];

// Validação de parâmetros ID
export const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID deve ser um número inteiro válido'),
  handleValidationErrors
];

// Validação de login
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail(),
  
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  
  sanitizeBody('*').escape(),
  handleValidationErrors
];
