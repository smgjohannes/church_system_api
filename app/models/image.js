'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: 'imageable_id',
        constraints: false,
        as: 'user',
        scope: {
          imageable_type: 'user',
        },
      });
      Image.belongsTo(models.Member, {
        foreignKey: 'imageable_id',
        constraints: false,
        as: 'member',
        scope: {
          imageable_type: 'member',
        },
      });
    }
  }

  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      imageable_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      imageable_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      directory: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
    }
  );

  Image.addHook('afterFind', (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.imageable_type === 'user' && instance.user !== undefined) {
        delete instance.imageable;
        delete instance.dataValues.imageable;
      }
      if (
        instance.imageable_type === 'member' &&
        instance.member !== undefined
      ) {
        delete instance.imageable;
        delete instance.dataValues.imageable;
      }
    }
  });

  return Image;
};
