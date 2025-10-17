# Servix - Sistema de Agendamento de Serviços

Sistema completo de agendamento de serviços com API backend, frontend web e aplicativo mobile.

## Estrutura do Projeto

```
Servix/
├── api_servix/          # API Backend (Node.js + Express + Sequelize)
├── servix-web/          # Frontend Web (React)
├── src/                 # Aplicativo Mobile (React Native)
└── servix-app/          # Aplicativo Expo (TypeScript)
```

## Configuração e Instalação

### 1. Backend (API)

```bash
cd api_servix
npm install
```

**Configuração do Banco de Dados:**
- Instale o PostgreSQL
- Crie um banco de dados chamado `servix_db`
- Configure as variáveis de ambiente no arquivo `.env`:

```env
DB_NAME=servix_db
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
PORT=3000
NODE_ENV=development
```

**Executar o servidor:**
```bash
npm run dev
```

### 2. Frontend Web

```bash
cd servix-web
npm install
npm start
```

### 3. Aplicativo Mobile

```bash
cd src
npm install
npx react-native run-android  # ou run-ios
```

## Funcionalidades

### Backend
- ✅ CRUD de Usuários
- ✅ CRUD de Serviços
- ✅ CRUD de Agendamentos
- ✅ Relacionamentos entre entidades
- ✅ Validações de dados
- ✅ Configuração com variáveis de ambiente

### Frontend Web
- ✅ Autenticação com Firebase
- ✅ Dashboard para prestadores
- ✅ Cadastro de serviços
- ✅ Listagem de serviços

### Mobile
- ✅ Autenticação com Firebase
- ✅ Navegação entre telas
- ✅ Listagem de usuários
- ✅ Listagem de serviços
- ✅ Interface responsiva

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- CORS

### Frontend Web
- React
- React Router
- Firebase Auth
- Axios

### Mobile
- React Native
- React Navigation
- Firebase Auth
- Axios

## API Endpoints

### Usuários
- `GET /api/usuarios` - Listar usuários
- `POST /api/usuarios` - Criar usuário

### Serviços
- `GET /api/servicos` - Listar serviços
- `POST /api/servicos` - Criar serviço
- `GET /api/servicos/:id` - Buscar serviço por ID
- `PUT /api/servicos/:id` - Atualizar serviço
- `DELETE /api/servicos/:id` - Deletar serviço

### Agendamentos
- `GET /api/agendamentos` - Listar agendamentos
- `POST /api/agendamentos` - Criar agendamento
- `GET /api/agendamentos/:id` - Buscar agendamento por ID
- `PUT /api/agendamentos/:id` - Atualizar agendamento
- `DELETE /api/agendamentos/:id` - Deletar agendamento

## Segurança

- ✅ Validação de dados de entrada
- ✅ Configuração de CORS
- ✅ Autenticação com Firebase
- ✅ Validação de email
- ✅ Sanitização de dados

## Próximos Passos

1. Implementar autenticação JWT no backend
2. Adicionar middleware de autenticação
3. Implementar upload de imagens
4. Adicionar notificações push
5. Implementar sistema de avaliações
6. Adicionar relatórios e dashboard administrativo

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

MIT License
