💼 API DevFinance
API RESTful desenvolvida para gerenciamento de transações financeiras, para um controle de gastos pessoais do projeto DevFinance .

Este backend foi construído como parte dos meus estudos para aprimorar meus conhecimentos em Node.js , TypeScript , Prisma , MongoDB e Fastify , além da integração com Firebase Authentication .

🚀 Funções
📌 Cadastro de transações (receita ou despesa)
🧾 Filtro por mês, ano, tipo e categoria
📊 Resumo mensal
🕓 Histórico por período
🔐 Autenticação via Firebase
🛠️ Tecnologias
Node.js
TypeScript
Fastify
Prisma ORM
MongoDB
Zod
SDK de administração do Firebase
Renderizar (Implantar)
Repositório do Front-end Clique aqui para acessar o repositório
⚙️ Como rodar localmente
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
