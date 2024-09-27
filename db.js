import { DataTypes, QueryTypes, Sequelize } from "sequelize";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
  }
);

try {
  await sequelize.authenticate();
  console.log("Соединение с БД было успешно установлено");
} catch (err) {
  console.log("Невозможно выполнить подключение к БД: ", e);
}

async function createTable() {
  await sequelize.sync();
}
createTable();
