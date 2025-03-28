import sequelize from "@/app/data/connection";
import { DataTypes, Model } from "sequelize";

/**
 * Model for an ingredient containing the ingredient name.
 */
export default class accounts extends Model {}

accounts.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    provider: { type: DataTypes.STRING, allowNull: false },
    providerAccountId: { type: DataTypes.STRING, allowNull: false },
    refresh_token: DataTypes.TEXT,
    access_token: DataTypes.TEXT,
    expires_at: DataTypes.BIGINT,
    id_token: DataTypes.TEXT,
    scope: DataTypes.TEXT,
    session_state: DataTypes.TEXT,
    token_type: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "accounts",
  }
);
