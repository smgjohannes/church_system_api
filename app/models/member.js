const { Model } = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const { sanitize } = require('../utils/sanitize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'member',
        },
      });
      Member.belongsTo(models.Church, {
        foreignKey: 'church_id',
        as: 'church',
      });
      Member.belongsToMany(models.Payment, {
        through: { model: models.MemberPayment },
        as: 'payments',
      });
    }
  }
  Member.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      church_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Church',
          key: 'id',
        },
      },
      id_number: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      surname: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      cell_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      member_of: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      local_church: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      from_date: {
        allowNull: true,
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      father: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mother: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['inactive', 'active'],
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      tableName: 'members',
      modelName: 'Member',
    }
  );

  SequelizeSlugify.slugifyModel(sequelize.models.Member, {
    source: ['name'],
    suffixSource: ['surname'],
  });
  Member.beforeCreate(async (member, options) => {
    if (member.body) {
      member.body = sanitize(member.body);
    }
  });

  Member.afterUpdate(async (member, options) => {
    if (member.body) {
      member.body = sanitize(member.body);
    }
  });

  Member.afterSave(async (member, options) => {
    if (member.details) {
      member.details = sanitize(member.details);
    }
  });

  return Member;
};
