# 💼 DevFinance API

API RESTful desenvolvida para gerenciamento de transações financeiras, para um controle de gastos pessoais do projeto **DevFinance**. 

Este backend foi construído como parte dos meus estudos para aprimorar meus conhecimento em **Node.js**, **TypeScript**, **Prisma**, **MongoDB** e **Fastify**, além da integração com **Firebase Authentication**.

---

## 🚀 Objetivo

- 📌 Cadastro de transações (receita ou despesa)
- 🧾 Filtro por mês, ano, tipo e categoria
- 📊 Resumo mensal
- 🕓 Histórico por período
- 🔐 Autenticação via Firebase

---

## 🛠️ Tecnologias

- **Node.js**
- **TypeScript**
- **Fastify**
- **Prisma ORM**
- **MongoDB**
- **Zod**
- **Firebase Admin SDK**
- **Render (Deploy)**

---

## ⚙️ Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/rodolfossilvadev/devfinance-backend
cd devfinance-backend

# 2. Instale as dependências
yarn

# 3. Configure as variáveis de ambiente
cp .env.example .env
# edite o arquivo .env com suas chaves do Firebase e MongoDB

# 4. Gere os schemas e inicie o servidor
npx prisma generate
yarn dev

## Variáveis de ambiente (.env)
PORT=3333

DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-db>?retryWrites=true&w=majority"

NODE_ENV=dev

FIREBASE_PROJECT_ID=devfinance-4622b
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@devfinance-4622b.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_PRIVADA\n-----END PRIVATE KEY-----\n"


Repositório do Front-end
<a href="https://github.com/rodolfossilvadev/devfinance-frontend" target="_blank">Clique aqui</a> para acessar o repositório
