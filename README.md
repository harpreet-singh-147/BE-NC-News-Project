# hdnews API

Welcome to the hdnews API, created as part of a week-long coding sprint at the [Northcoders bootcamp](https://northcoders.com/) to showcase my skills as a back-end Javascript developer.

The hdnews API is an easy-to-use RESTFUL API which allows the client to create, retrieve, update or delete JSON metadata for a number of topics, articles, users, and comments. This app will allow clients to interact with a PostgreSQL relational database (which was provided by [Northcoders](https://northcoders.com/)) hosted on heroku.

You can find the hosted version of the app here: https://hdnews.herokuapp.com/api

Accessing the ‘/api’ endpoint will present the client with a JSON file containing information about all the available endpoints with example responses. All endpoints were developed using jest and supertest to ensure controllers and models operated without issue.

## Cloning this repo

In order to access this repo locally, you can either fork and clone this repo, or clone directly from the following url:

```
https://github.com/harpreet-singh-147/BE-NC-News-Project.git
```

---

## Dependencies

You can install all dependencies by running:

```
npm i
```

The dependencies used in this project are:

- [express](https://www.npmjs.com/package/express): Used for creating the HTTP server.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from .env files.
- [node-postgres](https://www.npmjs.com/package/pg): Non-blocking PostgreSQL client for Node.js.
- [pg-format](https://www.npmjs.com/package/pg-format): Creates dynamic SQL queries.

The developer dependencies used in this project are:

- [husky](https://www.npmjs.com/package/husky): Used for managing pre-commit git hooks.
- [jest](https://www.npmjs.com/package/jest): A delightful JavaScript Testing Framework.
- [jest-extended](https://www.npmjs.com/package/jest-extended): Adds additional assertions to Jest's default assertions.
- [jest-sorted](https://www.npmjs.com/package/jest-sorted): Used for verifying results are returned in a set order.
- [supertest](https://www.npmjs.com/package/supertest): Used for testing HTTP assertions.

---

## Creating environment variables

Create 2 files in the root directory named:

- .env.development
- .env.test

In the newly created .env.development file connect to the database by typing the command:

```
PGDATABASE=nc_news
```

In the newly created .env.test file connect to the test database by typing the command:

```
PGDATABASE=nc_news_test
```

.env files are automatically excluded in the .gitignore file included within this repo.

---

## Create the database

Run the provided PSQL script to create the development and test databases:

```
npm run setup-dbs
```

---

## Seed the databases

Seed the development database with the following script:

```
npm run script
```

When running tests, test data will be used to seed the database before each test with the following script:

```
npm run test
```

---

## Node and Postgres versions

This app was made on Node version:

```
node -v | v18.4.0
```

Postgres version:

```
psql -V | 14.5
```

Please feel free to fork, clone and play around!
