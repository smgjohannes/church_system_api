const { Model } = require('sequelize');
const { USER_ROLE_LIST } = require('../utils/constants');
const passwordUtils = require('../utils/password');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Token, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'tokens',
      });
      User.belongsTo(models.Church, {
        foreignKey: 'church_id',
        as: 'church',
      });
    }
    getFullName() {
      return [this.first_name, this.last_name].join(' ');
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(USER_ROLE_LIST),
        allowNull: false,
        defaultValue: 'user',
      },
      church_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Church',
          key: 'id',
        },
        allowNull: true, // Superadmin may not belong to a church
      },
      country: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: true },
      email_verified_at: { type: DataTypes.DATE, allowNull: true },
      last_verified_email: { type: DataTypes.STRING, allowNull: true },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      dob: { type: DataTypes.DATEONLY, allowNull: true },
      gender: { type: DataTypes.STRING, allowNull: true },
      passport_no: { type: DataTypes.STRING, allowNull: true },
      picture: {
        allowNull: true,
        type: DataTypes.TEXT,
        // defaultValue: DEFAULT_PROFILE_PICTURE,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      underscored: true,
    }
  );

  User.prototype.toJSON = function toJSON() {
    const docs = { ...this.get() };
    delete docs.password;
    return docs;
  };

  User.prototype.compareHash = async function compareHash(password) {
    return passwordUtils.compare(password, this.get('password'));
  };

  User.beforeValidate((user, options) => {
    user.email = String(user.email).toLowerCase();
    if (!user.selector) {
      user.name = [user.first_name, user.last_name].join(' ');
      addSelector(user);
      delete user.name;
    }
  });

  return User;
};
