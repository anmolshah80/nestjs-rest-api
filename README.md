# Nest.js REST API

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

The application exposes the following routes under the global prefix `api/v1`.

### Users

- `GET /api/v1/users`
  - optional query: `?role=value` (value can be `INTERN`, `ENGINEER`, or `ADMIN`)
- `GET /api/v1/users/:id`
- `POST /api/v1/users`
- `PATCH /api/v1/users/:id`
- `DELETE /api/v1/users/:id`

### Employees

- `POST /api/v1/employees`
- `GET /api/v1/employees`
  - optional query: `?role=value` (value can be `INTERN`, `ENGINEER`, or `ADMIN`)
- `GET /api/v1/employees/:id`
- `PATCH /api/v1/employees/:id`
- `DELETE /api/v1/employees/:id`

## Notes

- [Fix long import paths in your NestJS project](https://dev.to/tkssharma/fix-long-import-paths-in-your-nestjs-project-nestjs-5g10)
  - [6.0 Migration Guide #62508](https://github.com/microsoft/TypeScript/issues/62508)

- [Prisma ORM in NestJS app](https://www.prisma.io/docs/guides/frameworks/nestjs)

- [CORS in NestJS](https://docs.nestjs.com/security/cors)

- [Rate Limiting in NestJS](https://docs.nestjs.com/security/rate-limiting)

- [Query Logging Extension (nestjs-prisma)](https://nestjs-prisma.dev/docs/query-logging-extension/)
