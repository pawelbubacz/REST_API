import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  entities: ['./dist/src/entities/*.js'],
  entitiesTs: ['./src/entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  allowGlobalContext: true
});