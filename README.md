# CineFlow (Back-end)
O Cineflow tem como objetivo oferecer uma solução prática para os clientes que enfrentam longas filas em cinemas. Através de um Totem interativo, o sistema facilitará a compra de ingressos e alimentos, tornando a experiência mais rápida e eficiente.

## Clonar o projeto
```bash
git clone https://github.com/VitorArgeri/CineFlow-BackEnd
cd CineFlow-BackEnd
```

## Instalar dependências
```bash
npm install
```

## Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com:
```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
```

## Banco de dados (Prisma)
Aplicar as migrações:
```bash
npx prisma migrate dev
npx prisma generate
```

## Rodar o servidor
```bash
npm run dev
```
A API ficará disponível em: http://localhost:4001

## Recursos e Endpoints

- Characters:
  - Endpoints: GET (listar todos), GET /:id (por id), POST (criar), PUT /:id (atualizar), DELETE /:id (remover)
  - Atributos (desconsiderando createdAt):  
    id, name, description, type, location, imgUrl, difficulty, diaryId

- Diaries:
  - Endpoints: GET (listar todos), GET /:id (por id), POST (criar), PUT /:id (atualizar), DELETE /:id (remover)
  - Atributos (desconsiderando createdAt):  
    id, title, description