const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MemberPayment extends Model {
    static associate(models) {
      MemberPayment.belongsTo(models.Payment, {
        foreignKey: 'payment_id',
        targetKey: 'id',
        as: 'payment',
      });
      MemberPayment.belongsTo(models.Member, {
        foreignKey: 'member_id',
        targetKey: 'id',
        as: 'member',
      });
    }
  }

  MemberPayment.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      member_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'Member',
          key: 'id',
        },
      },
      payment_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'Payment',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'MemberPayment',
      tableName: 'member_payments',
      timestamps: false,
    }
  );

  return MemberPayment;
};
