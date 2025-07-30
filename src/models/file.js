'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class File extends Model {

    static associate(models) {
    }
  }
  File.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};