# Mobi API
Server for member registration, and monthly tutorials/online articles.

## Getting started

### Requirements (Stuff to install)
1. Node.js v11.6.0
2. PostgreSQL v11
3. [Knex.js](https://knexjs.org) installed globally (`npm install -g knex`)

### Up and running
  1. git clone
  2. Set this directory as your current directory
  3. `npm install`
  4. `knex migrate:latest && knex seed:run`
  5. `cp .env.example .env`
  6.  Open the .env file, fill out the port number, version (v1), node_env (e.g. development), and a random hash for JWT signing
  7. `npm run dev`

### Changing migration
1. See `knex -h`

## TODO
- [ ] Document endpoints with Swagger
- [ ] Write better integration/unit tests
- [ ] Set up HTML templating on password email reset
- [ ] Set up CMS for tutorials/articles