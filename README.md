# 🏋️ JC Treinaments – Sistema de Gestão de Academia

Este projeto é um sistema web para gerenciamento de academias, desenvolvido como parte de um Trabalho de Conclusão de Curso. Ele permite o controle de alunos, planos de pagamento, sessões de treino e cobranças mensais, tudo acessível via navegador.

---

## ⚙️ Tecnologias Utilizadas

- **Frontend**: Vue.js  
- **Backend**: Node.js + Express  
- **ORM**: Sequelize  
- **Banco de Dados**: MySQL (via Docker)  
- **Ambiente**: WSL (Windows Subsystem for Linux)  
- **Versionamento**: Git + GitHub  

---

## 📦 Requisitos

- Git  
- Node.js (v18 ou superior)  
- Docker e Docker Compose  
- WSL (para usuários Windows)  
- Navegador moderno  

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/GabrielVilasboa/jc-treinamentos.git
cd jc-treinamentos
```

---

### 2. Suba o banco de dados com Docker

No diretório `jc-backend`, execute:

```bash
cd jc-backend
docker-compose up -d
```

**Estrutura esperada do `docker-compose.yml`:**

```yaml
version: '3'
services:
  mysql:
    image: mysql:8.0
    container_name: jc_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: jc-treinamentos
    ports:
      - "3306:3306"
    volumes:
      - ./mysql-data:/var/lib/mysql
```

---

### 3. Configure o backend

Dentro da pasta `jc-backend`, crie o arquivo `.env` com:

```env
MYSQL_DATABASE=jc-treinamentos
MYSQL_USER=root
MYSQL_PASSWORD=admin
MYSQL_HOST=localhost
MYSQL_PORT=3306

PORT=3000

JWT_SECRET=JcTrE1n4MeNT0sSECRETL0GiN
```

Em seguida, instale as dependências e inicie o backend:

```bash
npm install
node index.js
```

---

### 4. Configure o frontend

No diretório `jc-frontend`, crie um arquivo `.env` com:

```env
VITE_API_URL=http://localhost:3000/api/
```

Depois, instale e execute:

```bash
cd ../jc-frontend
npm install
npm run dev
```

---

## 💡 Observações

- O sistema **não usa Sequelize Migrations**; as tabelas devem ser criadas automaticamente ou manualmente configuradas.
- O backend espera que o banco MySQL esteja rodando localmente com as credenciais definidas no `.env`.
- O sistema não possui autenticação completa ou geração de boletos. Ele é voltado para controle interno da academia.

---

## 🖥️ Funcionalidades

- Painel de estatísticas (dashboard)  
- Cadastro e gerenciamento de alunos  
- Criação e edição de planos de pagamento  
- Agendamento de horários e sessões  
- Controle de presença e geração de pagamentos mensais  

---

## 📁 Repositório

[https://github.com/GabrielVilasboa/jc-treinamentos](https://github.com/GabrielVilasboa/jc-treinamentos)