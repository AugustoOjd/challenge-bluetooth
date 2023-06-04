const dotenv = require('dotenv')
dotenv.config()

const dbConfig = {
    "development": {
      "username":   process.env.DB_USERNAME,
      "password":   process.env.DB_PASSWORD,
      "database":   process.env.DB_NAME,
      "host":       process.env.DB_HOST,
      "dialect":    process.env.DB_DIALECT,
      "jwt_key":    process.env.JWT_KEY
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "postgres"
    }
  }

module.exports = {
    dbConfig
}