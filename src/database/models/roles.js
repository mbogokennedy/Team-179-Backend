/**
 * Roles model file for structuring the roles data in to the database.
 */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'RolesAuth',
      as: 'user',
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
  };
  return Role;
};
