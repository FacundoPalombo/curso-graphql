"use strict";
const { graphql, buildSchema } = require("graphql");
const express = require("express");
const app = express();
const gqlMiddleware = require("express-graphql");
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");

// Leyendo el esquema
const schema = buildSchema(
  readFileSync(join(__dirname, "lib", "schema.graphql"), "utf-8")
);

//Middlewares
process.env.NODE_ENV === "development"
  ? app.use(morgan("dev"))
  : app.use(morgan("tiny"));

//Ejecutar el query hello
graphql(schema, "{hello}", resolvers).then(data => {
  console.log(data);
});

app.use(
  "/api",
  gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
