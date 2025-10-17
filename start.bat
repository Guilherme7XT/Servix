@echo off
echo 🚀 Iniciando Servix - Sistema de Agendamento de Serviços
echo ==================================================

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não está instalado. Por favor, instale o Node.js primeiro.
    pause
    exit /b 1
)

echo 📦 Instalando dependências do backend...
cd api_servix
call npm install

echo 📦 Instalando dependências do frontend web...
cd ..\servix-web
call npm install

echo 📦 Instalando dependências do app mobile...
cd ..\src
call npm install

echo ✅ Todas as dependências foram instaladas!
echo.
echo 🔧 Para executar o projeto:
echo 1. Backend: cd api_servix ^&^& npm run dev
echo 2. Frontend Web: cd servix-web ^&^& npm start
echo 3. App Mobile: cd src ^&^& npm run android
echo.
echo 📚 Consulte o arquivo INSTRUCOES_INSTALACAO.md para mais detalhes.
pause
