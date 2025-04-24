import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: 'users',
  user: 'postgres',
  password: 'bubuplug',
  host: 'localhost',
  port: 5432,
  entities: ['./dist/src/entities/*.js'],
  entitiesTs: ['./src/entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  allowGlobalContext: true,
  migrations: {
    path: './infrastructure/migrations',
    pathTs: './infrastructure/migrations',
    glob: '!(*.d).{js,ts}'
  },
  seeder: {
    path: './infrastructure/seeders',
    pathTs: './infrastructure/seeders'
  }
});