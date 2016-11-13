module.exports = function(sequelize, DataTypes) {
  var Dashboard = sequelize.define('Dashboard', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Dashboard;
}