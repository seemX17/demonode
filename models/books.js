'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  books.init({
    name: DataTypes.STRING,
    author:{
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id"        
      }
    },
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};