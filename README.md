
# Backend do TG Fatec - Aplicação Mobile

Backend API com NodeJS e Express
Toda configuração de rotas e manipulação de dados no banco



## Estrutura da aplicação
```
|- src/
    |- controllers/
    |- middlewares/
    |- models/
    |- routes/
    |- services/
        |- app.js/
        |- server.js/
        |-connection.js
```
## Instalação

Instale nodeJS na sua máquina e instale as depedências com o comando:
```bash
  npm install
```

As depedências da aplicação são as seguintes:

```bash
  express\
  mysql2 \
  nodemon\
  dotenv \
  bcrypt \
  jsonwebtoken
```

## Configuração

Configure as variáveis de ambiente seguindo o modelo ".env.example", criando no mesmo diretório o arquivo ".env" e preenchendo com os dados corretos de banco
    
## Deploy

Para subir o backend utilize o comando

```bash
  npm run dev
  ou
  node .\src\services\server.js
```
