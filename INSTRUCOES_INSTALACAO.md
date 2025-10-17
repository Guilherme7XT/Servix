# Instruções de Instalação - Servix

## Pré-requisitos

1. **Node.js** (versão 16 ou superior)
2. **PostgreSQL** (versão 12 ou superior)
3. **npm** ou **yarn**

## Configuração do Banco de Dados

1. Instale o PostgreSQL
2. Crie um banco de dados:
```sql
CREATE DATABASE servix_db;
```
3. Crie um usuário (opcional):
```sql
CREATE USER servix_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE servix_db TO servix_user;
```

## Configuração do Backend

1. Navegue até o diretório da API:
```bash
cd Servix/api_servix
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` baseado no `config.example.txt`:
```bash
cp ../config.example.txt .env
```

4. Edite o arquivo `.env` com suas configurações:
```env
DB_NAME=servix_db
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
PORT=3000
NODE_ENV=development
```

5. Execute o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## Configuração do Frontend Web

1. Navegue até o diretório do frontend:
```bash
cd Servix/servix-web
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o frontend:
```bash
npm start
```

O frontend estará rodando em `http://localhost:3001`

## Configuração do App Mobile (React Native)

### Pré-requisitos para React Native:
- **Android Studio** (para Android)
- **Xcode** (para iOS - apenas no Mac)
- **Java Development Kit (JDK)** versão 11 ou superior
- **Android SDK** configurado

### Instalação:

1. Navegue até o diretório do mobile:
```bash
cd Servix/src
```

2. Instale as dependências:
```bash
npm install
```

3. **Para Android:**
   - Abra o Android Studio
   - Configure um emulador Android ou conecte um dispositivo
   - Execute:
   ```bash
   npx react-native run-android
   ```

4. **Para iOS (apenas no Mac):**
   - Abra o Xcode
   - Execute:
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

### Scripts de Inicialização Rápida:

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

## Configuração do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative a autenticação por email/senha
4. Copie as configurações do Firebase para os arquivos:
   - `Servix/servix-web/src/services/firebase.js`
   - `Servix/src/firebase.js`

## Testando a Aplicação

### Backend
- Acesse `http://localhost:3000` - deve mostrar "API do Servix online 🚀"
- Teste os endpoints:
  - `GET http://localhost:3000/api/usuarios`
  - `POST http://localhost:3000/api/usuarios`

### Frontend Web
- Acesse `http://localhost:3001`
- Faça login com uma conta Firebase
- Teste o cadastro de serviços

### Mobile
- Execute o app no emulador/dispositivo
- Teste o login e navegação

## Estrutura de Arquivos

```
Servix/
├── api_servix/          # Backend API
│   ├── config/          # Configurações do banco
│   ├── controllers/     # Controladores da API
│   ├── models/          # Modelos do Sequelize
│   ├── routes/          # Rotas da API
│   └── server.js        # Servidor principal
├── servix-web/          # Frontend Web (React)
│   ├── public/          # Arquivos públicos
│   └── src/             # Código fonte React
├── src/                 # App Mobile (React Native)
│   ├── screens/         # Telas do app
│   ├── contexts/        # Contextos React
│   └── services/        # Serviços (API, Firebase)
└── README.md            # Documentação principal
```

## Solução de Problemas

### Erro de Conexão com Banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Teste a conexão manualmente

### Erro de CORS
- O CORS está configurado para aceitar todas as origens em desenvolvimento
- Em produção, configure as origens específicas

### Erro de Firebase
- Verifique se as configurações do Firebase estão corretas
- Confirme se a autenticação por email/senha está habilitada

### Erro no React Native
- Execute `npx react-native doctor` para verificar a configuração
- Limpe o cache: `npx react-native start --reset-cache`

## Próximos Passos

1. Implementar autenticação JWT no backend
2. Adicionar middleware de autenticação
3. Implementar upload de imagens
4. Adicionar notificações push
5. Implementar sistema de avaliações
6. Adicionar relatórios e dashboard administrativo
