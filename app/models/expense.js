const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.Payment, {
        foreignKey: 'payment_id',
        as: 'payment',
      });
      Expense.belongsTo(models.Church, {
        foreignKey: 'church_id',
        as: 'church',
      });
    }
  }

  Expense.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      transaction_reference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0,
        },
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      payment_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Payment',
          key: 'id',
        },
      },
      church_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Church',
          key: 'id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      tableName: 'expenses',
      modelName: 'Expense',
    }
  );

  return Expense;
};
