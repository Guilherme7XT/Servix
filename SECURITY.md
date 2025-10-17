# 🔒 Guia de Segurança - Servix

## Visão Geral

Este documento descreve as medidas de segurança implementadas no sistema Servix e as melhores práticas para manter a aplicação segura.

## 🛡️ Medidas de Segurança Implementadas

### 1. **Autenticação e Autorização**
- ✅ **JWT (JSON Web Tokens)** para autenticação
- ✅ **Refresh Tokens** para renovação segura
- ✅ **Controle de acesso baseado em roles** (user, prestador, admin)
- ✅ **Criptografia de senhas** com bcrypt (salt rounds: 12)
- ✅ **Middleware de autenticação** em rotas protegidas

### 2. **Rate Limiting**
- ✅ **Rate limiting por IP** para prevenir ataques de força bruta
- ✅ **Limites específicos** para endpoints sensíveis:
  - Login: 5 tentativas por 15 minutos
  - Criação de recursos: 10 por minuto
  - API geral: 100 requisições por 15 minutos

### 3. **Validação e Sanitização**
- ✅ **Validação robusta** de dados de entrada
- ✅ **Sanitização** de strings para prevenir XSS
- ✅ **Express Validator** para validação de schemas
- ✅ **Verificação de tipos** e formatos de dados

### 4. **Headers de Segurança**
- ✅ **Helmet.js** para headers de segurança
- ✅ **Content Security Policy (CSP)**
- ✅ **HSTS** (HTTP Strict Transport Security)
- ✅ **X-Frame-Options** para prevenir clickjacking

### 5. **CORS e Comunicação**
- ✅ **CORS configurado** com origens específicas
- ✅ **Credenciais controladas** (credentials: true)
- ✅ **Métodos HTTP limitados**
- ✅ **Headers permitidos** restritos

### 6. **Logging e Monitoramento**
- ✅ **Logs de segurança** para atividades suspeitas
- ✅ **Morgan** para logging de requisições
- ✅ **Detecção de padrões maliciosos**
- ✅ **Monitoramento de tentativas de login**

### 7. **Proteção de Dados**
- ✅ **Criptografia de senhas** no banco de dados
- ✅ **Exclusão de senhas** nas respostas da API
- ✅ **Validação de tamanho** de payload
- ✅ **Índices de banco** para performance e segurança

## 🔐 Configuração de Segurança

### Variáveis de Ambiente Necessárias

```env
# JWT
JWT_SECRET=sua_chave_secreta_muito_forte_aqui
JWT_REFRESH_SECRET=sua_chave_refresh_muito_forte_aqui

# Banco de Dados
DB_NAME=servix_db
DB_USER=servix_user
DB_PASSWORD=senha_super_forte_do_banco
DB_HOST=localhost
DB_PORT=5432

# Servidor
PORT=3000
NODE_ENV=production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Configuração de Produção

1. **Use HTTPS** em produção
2. **Configure proxy reverso** (Nginx/Apache)
3. **Use variáveis de ambiente** para secrets
4. **Configure firewall** adequadamente
5. **Monitore logs** regularmente

## 🚨 Detecção de Ameaças

### Padrões Detectados
- Tentativas de SQL Injection
- Scripts maliciosos (XSS)
- User-Agents suspeitos
- Payloads muito grandes
- Muitas tentativas de login

### Respostas de Segurança
- Bloqueio automático de requisições suspeitas
- Logs detalhados de atividades maliciosas
- Rate limiting progressivo
- Retorno de códigos de erro específicos

## 📋 Checklist de Segurança

### Para Desenvolvedores
- [ ] Nunca commitar secrets no código
- [ ] Usar HTTPS em produção
- [ ] Validar todos os inputs
- [ ] Implementar logging adequado
- [ ] Testar rate limiting
- [ ] Verificar headers de segurança

### Para Administradores
- [ ] Configurar firewall
- [ ] Monitorar logs regularmente
- [ ] Atualizar dependências
- [ ] Backup seguro do banco
- [ ] Configurar alertas de segurança
- [ ] Revisar permissões de usuários

## 🔧 Comandos de Segurança

### Verificar Dependências Vulneráveis
```bash
npm audit
npm audit fix
```

### Testar Rate Limiting
```bash
# Teste de força bruta
for i in {1..10}; do curl -X POST http://localhost:3000/api/auth/login; done
```

### Verificar Headers de Segurança
```bash
curl -I http://localhost:3000
```

## 🆘 Resposta a Incidentes

### Em Caso de Ataque
1. **Identifique** a origem do ataque
2. **Bloqueie** o IP se necessário
3. **Analise** os logs de segurança
4. **Notifique** a equipe
5. **Documente** o incidente
6. **Implemente** medidas preventivas

### Contatos de Emergência
- Equipe de Desenvolvimento: dev@servix.com
- Administrador de Sistema: admin@servix.com
- Segurança: security@servix.com

## 📚 Recursos Adicionais

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 🔄 Atualizações de Segurança

Este documento deve ser atualizado sempre que:
- Novas vulnerabilidades forem descobertas
- Novas medidas de segurança forem implementadas
- Mudanças na arquitetura do sistema
- Atualizações de dependências críticas

---

**Última atualização**: $(date)
**Versão**: 1.0
**Responsável**: Equipe de Segurança Servix
