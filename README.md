# Sistema de Indicação (Referral System)

Este projeto foi desenvolvido como um desafio técnico para criar uma aplicação web de página única (SPA) que implementa um sistema de cadastro de usuários com pontuação por indicação.

A arquitetura do projeto segue o padrão de *monorepo* (pastas `backend/` e `frontend/`) e utiliza tecnologias modernas e de mercado.

---

## 1. Stack Tecnológica e Justificativas

### Requisitos Técnicos e Escolhas

| Componente | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Arquitetura** | Monorepo | Facilita o desenvolvimento e a implantação de um projeto *full-stack* pequeno/médio, mantendo o versionamento e a gestão de dependências em um único local. |
| **Back-end (API)** | **Java Spring Boot 3 + JPA** | Escolhido pela robustez, alta performance e maturidade para construção de APIs REST empresariais. O Spring Data JPA com MySQL simplifica a persistência e garante a integridade transacional necessária para a lógica de pontuação. |
| **Front-end (SPA)** | **React (c/ Vite)** | Padrão de mercado para o desenvolvimento de SPAs. O React é ideal para o gerenciamento de estado complexo (como validações de formulário e estado de autenticação) e renderização eficiente. |
| **Banco de Dados** | **MySQL (via Docker)** | Escolhido para persistência de dados em produção, com o Docker garantindo um ambiente de desenvolvimento idêntico e portátil. |
| **Segurança** | **JWT (JSON Web Tokens)** | Padrão para autenticação *stateless* em APIs REST. Garante que as rotas protegidas (Perfil) só sejam acessíveis mediante um token válido, substituindo o conceito de sessões tradicionais. |
| **Estilização** | **CSS Puro (`*.css`)** | Todo o *styling* (layout, responsividade e temas) foi escrito em CSS puro|

---

## 2. Requisitos Funcionais e Lógica

O projeto implementa as seguintes funcionalidades, conforme solicitado:

### A. Validação e Lógica de Cadastro

1.  **Validação Front-end (`Cadastro.jsx`):** A validação dos campos `e-mail` e `senha` é feita no React, utilizando **Expressões Regulares (Regex)** para garantir:
    * **E-mail:** Formato válido (ex: `usuario@dominio.com`).
    * **Senha:** Mínimo de 8 caracteres, contendo pelo menos 1 letra e 1 número.
2.  **Lógica de Indicação (Fluxo JWT):**
    * A página `/cadastro` lê o `ID` do indicador via *query parameter* (`?ref=ID`).
    * O *payload* de cadastro envia esse `idReferencia` para o *backend*.
    * **Backend (`UserService`):** Após o usuário ser salvo (`userRepository.save(novoUser)`), o método verifica o `idReferencia` e, se válido, incrementa a `pontuacao + 1` para o usuário indicador **dentro de uma transação**.
    * Após o sucesso, o *backend* **Gera o Token JWT** e o retorna no `UserResponseDTO`.

### B. Página de Perfil (Pós-login)

1.  **Proteção de Rota:** A rota `/perfil` é protegida no *frontend* (`ProtectedRoute`) pela existência do `token` no `localStorage`.
2.  **Acesso à API:** O *frontend* envia o Token JWT no cabeçalho `Authorization: Bearer <token>` para o *endpoint* protegido (`GET /api/usuarios/{id}`).
3.  **Exibição:** A página exibe o nome do usuário, a **pontuação atual (dados reais da API)** e o link de indicação único.
4.  **Botão Copiar Link:** Utiliza a API nativa `navigator.clipboard` para copiar o link para a área de transferência.

---

## 3. Como Rodar o Projeto

### Pré-requisitos

* Docker Desktop (ou Engine)
* Java Development Kit (JDK) 17+
* Node.js e npm

### 3.1. Configuração do Backend e Banco de Dados (MySQL)

1.  **Iniciar o MySQL (Docker):**
    Na **raiz** do repositório, inicie o contêiner.

    ```bash
    # Na raiz do projeto (onde está o docker-compose.yml)
    docker compose up -d
    ```

2.  **Configurar Credenciais Locais:**
    Crie o arquivo **`backend/src/main/resources/application-local.properties`** e defina suas credenciais, garantindo que elas correspondam aos valores do `docker-compose.yml` (`mysqlDB` e `mysqlPW`).

    ```properties
    # backend/src/main/resources/application-local.properties
    spring.profiles.active=local
    spring.datasource.url=jdbc:mysql://localhost:3306/mysqlDB?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    spring.datasource.username=root
    spring.datasource.password=mysqlPW 
    jwt.secret=sua_chave_secreta_de_desenvolvimento_longa_e_unica
    app.cors.allowed-origin=http://localhost:5173
    ```

3.  **Iniciar a API Spring Boot:**
    Na pasta `backend/`, inicie a aplicação ativando o perfil `local`:

    ```bash
    cd backend
    ./mvnw spring-boot:run -D"spring.profiles.active=local"
    ```

### 3.2. Configuração e Inicialização do Frontend (React)

1.  **Instalar Dependências:**
    Na pasta `frontend/`, instale as dependências:

    ```bash
    cd frontend
    npm install
    ```

2.  **Configurar a URL da API:**
    Crie o arquivo **`frontend/.env`** e aponte para o endereço da API:

    ```env
    # frontend/.env
    VITE_API_BASE_URL=http://localhost:8080
    ```

3.  **Inicie o Frontend:**

    ```bash
    npm run dev
    ```

A aplicação estará acessível em **`http://localhost:5173/cadastro`**.

---

## 4. Uso de Inteligência Artificial

Ferramentas assistentes de IA (como Gemini/Code Assistants) foram utilizadas para acelerar o desenvolvimento, principalmente em:
* Geração e refinamento das **Expressões Regulares (Regex)** para validação de senha.
* Estruturação do **Fluxo de Segurança JWT** (Filtro, Service, Config).
* Configuração do MySQL via Docker.
* Diagnóstico e correção de problemas diversos.
* Code Review de todo o projeto.
* Escrita desse readme.md
