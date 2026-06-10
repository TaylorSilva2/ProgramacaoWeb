# CRUD Continentes, Países e Cidades

Este projeto é uma aplicação web full stack para gerenciar continentes, países e cidades com autenticação JWT, integração com APIs externas e banco de dados MySQL.

## Estrutura do projeto

- `backend/` - servidor Node.js com Express, TypeScript, Prisma e MySQL
- `frontend/` - aplicação React com TypeScript, React Router e Axios

## Pré-requisitos

- Node.js 18+
- npm 10+
- MySQL instalado e rodando

## Configuração do banco de dados

1. Crie o banco de dados MySQL:

```sql
CREATE DATABASE continentes_db;
```

2. Copie o arquivo de exemplo de ambiente do backend:

No PowerShell:

```powershell
cd "d:\4°ADS\ProgWEB\ProgramacaoWeb\CRUD – TypeScript\backend"
copy .env.example .env
```

3. Ajuste o `.env` com seus dados MySQL e uma chave JWT segura:

```env
DATABASE_URL="mysql://root:senha@127.0.0.1:3306/continentes_db"
JWT_SECRET="sua_chave_jwt_segura"
PORT=5000
```

## Rodando o backend

1. Entre na pasta do backend:

```powershell
cd "d:\4°ADS\ProgWEB\ProgramacaoWeb\CRUD – TypeScript\backend"
```

2. Instale dependências:

```powershell
npm install
```

3. Gere o Prisma Client:

```powershell
npx prisma generate
```

4. Execute as migrations para criar o schema no banco:

```powershell
npx prisma migrate dev --name init
```

5. Inicie o servidor em modo de desenvolvimento:

```powershell
npm run dev
```

O backend estará disponível em `http://localhost:5000`.

## Rodando o frontend

1. Entre na pasta do frontend:

```powershell
cd "d:\4°ADS\ProgWEB\ProgramacaoWeb\CRUD – TypeScript\frontend"
```

2. Instale dependências:

```powershell
npm install
```

3. Inicie o Vite:

```powershell
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

## Uso básico

- Acesse `http://localhost:5173/login`
- Cadastre um usuário ou faça login
- Acesse as páginas de Continentes, Países e Cidades
- Use os filtros e paginação nas tabelas
- No Dashboard, busque por país para ver dados externos

## Observações

- O backend usa JWT e validação de token em rotas protegidas
- A comunicação entre frontend e backend é feita via Axios
- O banco de dados é gerenciado pelo Prisma

## Estrutura de pastas

```text
CRUD – TypeScript/
  backend/
  frontend/
```
## Vídeo de demonstração:
https://youtu.be/dsQCfT49mDU