import sequelize from "@/app/data/connection";
import { DataTypes, Model } from "sequelize";

/**
 * Model for an ingredient containing the ingredient name.
 */
export default class users extends Model {}

users.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    emailVerified: DataTypes.TIME,
    image: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "users",
  }
);
