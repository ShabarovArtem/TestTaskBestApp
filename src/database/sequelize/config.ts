const config = {
  development: {
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_migrations',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seeders',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    seedersPath: './src/database/sequelize/seeders',
  },
  production: {
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_migrations',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seeders',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    seedersPath: './src/database/sequelize/seeders',
  },
};

export = config;
