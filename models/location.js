module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      Location_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Location_latitude: {
        type: DataTypes.FLOAT, 
        allowNull: false,
      },
      Location_longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "locations",
    }
  );

  return Location;
};
