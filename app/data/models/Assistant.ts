import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

/**
 * Model for an ingredient containing the ingredient name.
 */
export default class Assistant extends Model {}

Assistant.init(
  {
    openaiID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Assistant",
  },
);
