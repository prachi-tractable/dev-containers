# data-collection-service

This service handles the key functionality of gathering data from the Car Owner.

It provides two APIs, internal and external which can be found in the [architecture diagram](https://miro.com/app/board/uXjVOVXkNMs=/).

## Dependencies

- [Docker](https://www.docker.com/products/docker-desktop/) - you must have docker installed and running to use this service
  - You can verify this by running `docker ps` - this should log a (potentially empty) table
- [@coa/logging](../../packages/logging) - the logging package must be built before you can build or run this service

## Getting started

Running the application

1. Ensure all [dependencies](#dependencies) have been installed/started
2. Copy the `.env.example` file to `.env` which contains defaults for the following properties
   `ENVIRONMENT` - The environment you are running the server in (see [here](./src/util/environment/Environment.ts) for the acceptable values)
   `LOG_LEVEL` - The minimum log level being printed (e.g. if set to `info` then `debug` statements will not be logged)
   `PORT` - This is the port the server will be hosted on
   `DATABASE_URL` - The connection string of database (should match the credentials specified in the [local compose file](./docker-compose.local.yaml))
3. If running all services together then return to the [Getting started](../../README.md#getting-started) guide at the root of the project
4. Run `yarn dev` - this command will start and migrate a database in docker for you before starting the development server

Testing the application

1. Ensure all [dependencies](#dependencies) have been installed/started
2. (Optional) Adjust the `.env.test` file - the defaults should mean the tests work out of the box
3. If test all services together then return to the [Getting started](../../README.md#getting-started) guide at the root of the project
4. If you just want to run the unit tests then run `yarn test:unit` - this will be much faster than running the full test suite
5. If you just want to run the api tests then run `yarn test:api` - this command will start and migrate a test database in docker for you before running the tests
6. To run all tests run `yarn test`

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

## Logging

The default logging level of this application is `info`. If you want to run with a different log level you can specify the `LOG_LEVEL` environment variable in your `.env` file.

```txt
LOG_LEVEL=debug
```

By default, `debug` logs will not show unless you change set the `LOG_LEVEL` variable to `debug`.

For more information on logging levels see the [`@coa/logging` package](../../packages/logging/README.md#logging-levels)
