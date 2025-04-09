import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
    driver: PostgreSqlDriver,
    dbName: 'users',
    user: 'postgres',
    password: 'bubuplug',
    host: 'localhost',
    port: 5432,
    entities: ['./dist/entities/*.js'],
    entitiesTs: ['./entities/*.ts'],
    metadataProvider:
    TsMorphMetadataProvider,
    debug: true,
    allowGlobalContext: true, 
};

export default config;