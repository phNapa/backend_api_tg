
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

Instale nodeJS na sua máquina e as seguintes depedências

```bash
  npm install express\
  npm install mysql2 \
  npm install nodemon\
  npm install dotenv \
  npm install bcrypt \
  npm install jsonwebtoken
```
    
## Deploy

Para subir o backend utilize o comando

```bash
  npm run dev
  ou
  node .\src\services\server.js
```
