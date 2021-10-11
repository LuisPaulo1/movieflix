# MovieFlix

# Sobre o projeto

O sistema MovieFlix consiste em um banco de filmes, os quais podem ser listados e avaliados pelos usuários. Usuários podem ser visitantes (VISITOR) e membros (MEMBER).

## Layouts da aplicação

### 320px
![Web_1](https://github.com/LuisPaulo1/assets/blob/master/movieflix/320px.png)

### 1200px
![Web_1](https://github.com/LuisPaulo1/assets/blob/master/movieflix/home.png)
#
![Web_2](https://github.com/LuisPaulo1/assets/blob/master/movieflix/listagem-filmes.png)
#
![Web_3](https://github.com/LuisPaulo1/assets/blob/master/movieflix/detalhes-filme.png)

## Collection do Postman
Importar o link no Postman: https://www.getpostman.com/collections/20fe14879b6838df13ca

## Variáveis de ambiente utilizadas no postman
![Postman](https://github.com/LuisPaulo1/assets/blob/master/movieflix/vari%C3%A1veis-ambiente.png)

## Modelo conceitual
![Modelo Conceitual](https://github.com/LuisPaulo1/assets/blob/master/movieflix/diagrama-classes.png)

## Arquitetura da aplicação
![Arquitetura](https://github.com/LuisPaulo1/assets/blob/master/movieflix/arquitetura.png)

## Regras de implementação
- Ao acessar a rota raiz do app, deverá aparecer uma tela de login.
- Ao fazer login com sucesso, o usuário deverá ser redirecionado para a rota /movies que corresponde à tela de listagem de filmes.
- Durante todo o tempo em que o usuário estiver logado, deverá aparecer na barra de navegação um botão “Sair” que deverá realizar o logout do usuário e redirecioná-lo para a tela de login.
- A tela de listagem de filmes deve exibir apenas um título, e dois links para os detalhes dos filmes de código 1 e 2 respectivamente.
- Ao clicar em um dos links dos detalhes do filme, o usuário deve ser levado para a rota /movies/:movieId, que corresponde à tela de detalhes do filme.
- Na tela de detalhes do filme, caso o usuário possua o perfil MEMBER, deve ser exibido um card com um formulário para que o usuário possa entrar com uma avaliação do filme. Se o usuário não possuir o perfil de MEMBER, este card não deve ser exibido.
- Na tela de detalhes do filme, abaixo do card de formulário, deve aparecer um outro card com uma listagem de TODAS avaliações daquele filme. Quando um usuário MEMBER informar com sucesso uma nova avaliação, esta listagem deve ser atualizada.
- As telas listagem de filmes e detalhes do filme devem ser rotas protegidas. Se o usuário não autenticado tentar acessar diretamente essas rotas, ele deve ser redirecionado para a tela de login.

## Usuários para Login
- Login: ana@gmail.com - Senha: 123456 - Perfil: MEMBER
- Login: bob@gmail.com - Senha: 123456 - Perfil: VISITOR

# Tecnologias utilizadas
## Backend
- Java
- Spring (boot, web, data, security)
- JPA / Hibernate
- Maven
- Banco de dados H2
- JUnit 5 (Teste de Integração)

## Frontend
- HTML / CSS / JS / TypeScript
- ReactJS
- React Router DOM
- Axios
- React Hook Form
- QS (Query String)
- JWT Decode

# Como executar o projeto

## Clonar o repositório
```bash
git clone https://github.com/LuisPaulo1/movieflix.git
```

## Para executar o backend
Pré-requisitos: Java 11

```bash
# entrar na pasta do projeto backend
cd movieflix/backend

# executar o projeto
./mvnw spring-boot:run
```

## Para executar o frontend
Pré-requisitos: yarn

```bash
# entrar na pasta do projeto frontend
cd movieflix/frontend

# instalar dependências
yarn

# executar o projeto
yarn start
```

# Autor

Luis Paulo

https://www.linkedin.com/in/luis-paulo-souza-a54358134/
