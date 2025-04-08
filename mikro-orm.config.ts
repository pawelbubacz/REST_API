import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
    driver: PostgreSqlDriver,
    dbName: 'test',
    user: 'postgres',
    password: 'bubuplug',
    host: 'localhost',
    port: 5432,
    entities: ['dist//*.entity.js'],
    entitiesTs: ['src//*.entity.ts'],
    metadataProvider:
    TsMorphMetadataProvider,
    debug: true, };

export default config;