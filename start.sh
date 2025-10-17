#!/bin/bash

echo "🚀 Iniciando Servix - Sistema de Agendamento de Serviços"
echo "=================================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se PostgreSQL está rodando
if ! pg_isready -q; then
    echo "⚠️  PostgreSQL não está rodando. Por favor, inicie o PostgreSQL primeiro."
    echo "   No Windows: net start postgresql-x64-13"
    echo "   No Linux/Mac: sudo service postgresql start"
fi

echo "📦 Instalando dependências do backend..."
cd api_servix
npm install

echo "📦 Instalando dependências do frontend web..."
cd ../servix-web
npm install

echo "📦 Instalando dependências do app mobile..."
cd ../src
npm install

echo "✅ Todas as dependências foram instaladas!"
echo ""
echo "🔧 Para executar o projeto:"
echo "1. Backend: cd api_servix && npm run dev"
echo "2. Frontend Web: cd servix-web && npm start"
echo "3. App Mobile: cd src && npm run android (ou npm run ios)"
echo ""
echo "📚 Consulte o arquivo INSTRUCOES_INSTALACAO.md para mais detalhes."
