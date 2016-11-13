module.exports = function(sequelize, DataTypes) {
  var Preference = sequelize.define('Preference', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Preference;
}