const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsToMany(models.Member, {
        through: { model: models.MemberPayment },
        as: 'member',
      });
      Payment.hasMany(models.Expense, {
        foreignKey: 'payment_id',
        as: 'expenses',
      });
      Payment.belongsTo(models.Church, {
        foreignKey: 'church_id',
        as: 'church',
      });
    }
  }

  Payment.init(
    {
      church_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Church',
          key: 'id',
        },
      },
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      account: {
        type: DataTypes.ENUM(
          'Membership',
          'Pastoral Fund',
          'Contribution',
          'Building Fund',
          'Tithe',
          'Offering',
          'Stationary',
          'Thanks Giving'
        ),
        allowNull: false,
        defaultValue: 'Offering',
      },
      reference: {
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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
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
      tableName: 'payments',
      modelName: 'Payment',
    }
  );

  return Payment;
};
