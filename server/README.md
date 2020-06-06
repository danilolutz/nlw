# Next Level Week - Server

@Rocketseat immersion week.

## How to create project

```bash
npm init

npm install cors express knek sqlite3 celebrate multer dotenv

npm @types/dotenv @types/hapi__joi @types/multer @types/cors @types/cors ts-node ts-node-dev typescript -D

npx typescript --init
```

Set the `script` section on package.json to:

```json
  "scripts": {
    "dev": "ts-node-dev src/server.ts",
    "knex:migrate": "knex  --knexfile knexfile.ts migrate:latest",
    "knex:seed": "knex  --knexfile knexfile.ts seed:run"
  },
```

Create `connection.ts` and `knexfile.ts`. Create the migrations and seeds when needed. After that run:

```bash
npm run knex:migrate
npm run knex:seed

// and

npm run dev
```

Access the server on: [http://localhost:3333](http://localhost:3333)
