const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Church extends Model {
    static associate(models) {
      Church.hasMany(models.User, { foreignKey: 'church_id', as: 'users' });
      Church.hasMany(models.Member, { foreignKey: 'church_id', as: 'members' });
      Church.hasMany(models.Payment, {
        foreignKey: 'church_id',
        as: 'payments',
      });
      Church.hasMany(models.Expense, {
        foreignKey: 'church_id',
        as: 'expenses',
      });
    }
  }

  Church.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'churches',
      modelName: 'Church',
    }
  );

  return Church;
};
