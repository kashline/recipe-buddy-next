import sequelize from "@/app/data/connection";
import { DataTypes, Model } from "sequelize";

/**
 * Model for an ingredient containing the ingredient name.
 */
export default class verification_token extends Model {}

verification_token.init(
  {
    identifier: {
      primaryKey: true,
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires: { type: DataTypes.TIME, allowNull: false },
    token: { type: DataTypes.TEXT, allowNull: false, primaryKey: true },
  },
  {
    sequelize,
    modelName: "verification_token",
  }
);
