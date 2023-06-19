# Nest JWT PostgreSQL
Boilerplate Nest.js API with PostgreSQL database, Prisma ORM and JWT authentication.

## Getting started
1. Run `npm install`
2. Spin up a local PostgreSQL database
3. Create a `.env` file and fill in the fields listed in `.env.default` 
4. Run `npx prisma migrate reset` to align your database with the Prisma schema
5. Run `npm run start:dev`
6. Go to [localhost:3000](http://localhost:3000), you should see the swagger of your API

## Spin up local PostgresSQL database

Run
```bash
cd database
docker-compose up
```

By default, the database is running following the below config:
- adress: `localhost:5432`
- user: `postgres`
- password: `password`
You can change this within the `docker-compose.yaml` file.

Connect to the container using 
```bash
docker exec -it localdb_c bash
```
Then run,
```bash
psql -U postgres # to connest to postgres user
\conninfo # to get connection info
\l # to get the DB list
CREATE DATABASE <DB_NAME>; # create a DB named nest
\c <DB_NAME>; # to connect to DB
```
Press `Ctrl+D` twice to exit posgres and the container


### Common issues

- you might need to install `docker-compose` independently.
- if `docker` deamon is not running, use `sudo systemctl start docker`.
- permission denied: use `sudo` before `docker` commands.
- depending on your `docker` engine and `docker-compose` version you might need to cahnge `version: "3.3"` in `docker-compose.yaml`.