"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gdpr_record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gdpr_record.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      flag_html: {
        type: DataTypes.TEXT,
      },
      enforcement_agency: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      fine: {
        type: DataTypes.FLOAT,
      },
      law: {
        type: DataTypes.STRING,
      },
      law_title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      link_to_doc: {
        type: DataTypes.TEXT,
      },
      link_to_enforcement_tracker: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "gdpr_record",
    }
  );
  return gdpr_record;
};
