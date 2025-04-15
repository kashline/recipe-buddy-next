import sequelize from "@/app/data/connection";
import { DataTypes, Model } from "sequelize";

/**
 * Model for an ingredient containing the ingredient name.
 */
export default class sessions extends Model {}

sessions.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    expires: { type: DataTypes.TIME, allowNull: false },
    sessionToken: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "sessions",
  },
);
