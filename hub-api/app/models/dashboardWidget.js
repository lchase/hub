module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('dashboardWidget', {
    col: { 
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Model;
}