import { SQL } from "bun";

const mySQL = new SQL({
  adapter: "mysql",
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default mySQL;
