# dev-containers

Clone this repo to get started for the dev containers lunch and learn workshop.

## Dependencies

- [Docker](https://www.docker.com/products/docker-desktop/) - you must have docker installed and running to use this service
  - You can verify this by running `docker ps` - this should log a (potentially empty) table

## Commands

- `yarn dev` - Starts a development server with hot reloading. This command will start and migrate a database in docker for you before starting the development server
- `yarn build` - Builds a production instance of the server
- `yarn start` - Runs the production build
- `yarn lint:check` - Runs the linter and formatter throwing when there are errors
- `yarn lint:fix` - Runs the linter and formatter and tries to fix any errors
- `yarn test:unit` - Runs just the unit tests - useful when developing on the unit tests as the api tests are much slower
- `yarn test:api` - Runs just the api tests - this command will start and migrate a test database in docker for you before running the tests
- `yarn test` - Runs both the unit and api tests commands
- `yarn db:start:local` - Starts a local development database (using the [local compose file](./docker-compose.local.yaml))
- `yarn db:start:test` - Starts a test database (using the [test compose file](./docker-compose.test.yaml))
- `yarn db:migrate:local` - Performs a migration on the local development database and regenerates the prisma client
- `yarn db:migrate:test` - Performs a migration on the test database
