// Update with your config settings.

const dev = {
  client: 'postgresql',
  connection: {
    database: 'task-manager',
    user:     'user',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

const prod = {
  client: 'postgresql',
  connection: {
    host: 'ec2-79-125-117-53.eu-west-1.compute.amazonaws.com',
    database: 'df40ot17fi52bb',
    port: 5432,
    user: 'opasqfhjqbseju',
    password: '55d2c07628aee8f7fd20e60e22921c1539d22db36fad9c2e3c5f51e73ec58f7f',
    uri: 'postgres://opasqfhjqbseju:55d2c07628aee8f7fd20e60e22921c1539d22db36fad9c2e3c5f51e73ec58f7f@ec2-79-125-117-53.eu-west-1.compute.amazonaws.com:5432/df40ot17fi52bb'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};


module.exports = {

  development: process.env.NODE_ENV === "production" ? prod : dev,
  production: prod

};
