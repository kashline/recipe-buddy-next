// 'use server'

import * as pg from 'pg'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  username: 'postgres',
  host: 'localhost',
  database: 'kevinashline',
  port: '5432',
  password: 'uYOP9g2XtF',
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
