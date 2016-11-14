module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('Widget', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Model;
}