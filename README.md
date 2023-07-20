# Bem vindo ao repositório do projeto Football-Leaderboards!

Esse projeto é uma com front-end e back-end que mostra e calcula uma tabela de pontos de um campeonato de futebol, desenvolvido em TypeScript usando os princípios de Programação Orientada a Objetos, estruturado em camadas (MSC) e conectado a um BD relacional (MySQL) usando o ORM sequelize. Front-end, back-end e BD dockerizados e orquestrados com Docker Compose. Aplicação é testada usando Mocha, Chai e Sinnon.

Esse projeto foi realizado durante o curso de Web Dev Full-Stack da Trybe e não foi desenvolvido do zero.
A parte do projeto que compete à Trybe foram parte do front-end e configuração do lint, jest e sequelize.

O que foi desenvolvido por mim: camadas controller, model, service, rotas, tratamento de erros, jwt, docker, interfaces, middlewares, testes unitários, seeder e migrations do sequelize.

Para rodar rodar o app local:
1. Inicializar Docker:
No terminal da aplicação:
```npm run compose:up```
