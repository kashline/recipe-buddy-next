// 'use server'

import * as pg from 'pg'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  username: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: '5432',
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  define: {
    hooks: {
      beforeFind: (model) => {
        model.attributes = {}
        model.attributes.exclude = ['createdAt', 'updatedAt']
      }
    },
    timestamps: false
  },
  define: {
    scopes: {
      excludeId: {
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'mealdb_id'] }
      }
    },
    timestamps: false
  }
 })

 export default sequelize
