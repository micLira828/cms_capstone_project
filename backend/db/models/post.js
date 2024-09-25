'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "userId" });
      Post.belongsTo(models.Blog, { foreignKey: "blogId" });
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    blogId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    postEntry: DataTypes.TEXT('long'),
    validate: {
        len: [500, 10000],
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};