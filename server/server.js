import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import schema from "./schema/schema.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
