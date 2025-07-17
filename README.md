💼 DevFinance - API
API RESTful desenvolvida para gerenciamento de transações financeiras pessoais. Este projeto foi criado como parte dos meus estudos para aprimorar conhecimentos em Node.js, TypeScript, Prisma, MongoDB, Fastify e Firebase Authentication.

✨ Objetivo do Projeto
O DevFinance tem como objetivo ajudar usuários a controlarem suas receitas e despesas mensais, oferecendo funcionalidades de cadastro, visualização, filtragem e resumo de transações financeiras. A API serve como base para o front-end da aplicação, fornecendo endpoints seguros e performáticos.

Durante esse projeto, aprendi sobre:

Estruturação de APIs REST com Fastify;

Criação de schemas e validação com Zod;

Uso do Prisma ORM com MongoDB;

Autenticação segura com Firebase Admin;

Deploy gratuito com Render;

Boas práticas com TypeScript.

🚀 Funcionalidades
📌 Cadastro de transações (receitas e despesas)

🧾 Filtro por mês, ano, tipo e categoria

📊 Resumo mensal de entradas e saídas

🕓 Histórico por período

🔐 Autenticação via Firebase

📁 Integração com front-end React

🛠️ Tecnologias Utilizadas
Node.js

TypeScript

Fastify

Prisma ORM

MongoDB Atlas

Zod

Firebase Admin SDK

Render para deploy

⚙️ Como rodar localmente
bash
Copiar
Editar
# 1. Clone o repositório
git clone https://github.com/rodolfossilvadev/devfinance-backend
cd devfinance-backend

# 2. Instale as dependências
yarn

# 3. Configure as variáveis de ambiente
cp .env.example .env
# edite o arquivo .env com suas credenciais

# 4. Gere os schemas do Prisma
npx prisma generate

# 5. Inicie o servidor
yarn dev
🔐 Variáveis de Ambiente (.env)
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar
Editar
PORT=3333

DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-db>?retryWrites=true&w=majority"

NODE_ENV=dev

FIREBASE_PROJECT_ID=devfinance-4622b
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@devfinance-4622b.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA\n-----END PRIVATE KEY-----\n"
⚠️ Importante: Coloque a chave privada completa entre aspas e substitua todas as quebras de linha por \n. Nunca suba esse arquivo para o GitHub.

🌐 Link da API em Produção
👉 https://devfinance-backend-1.onrender.com

🖥️ Repositório do Front-End
👉 https://github.com/rodolfossilvadev/devfinance-frontend
