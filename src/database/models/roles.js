module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    role: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      foreignKey: 'roleId',
      through: 'RolesAuth',
      as: 'user',
    });
  };
  return Role;
};