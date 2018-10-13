export default (sequelize, DataTypes) => {
    const City = sequelize.define('city', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      Country: {
        type: DataTypes.STRING,
      },
      City: {
        type: DataTypes.STRING,
      },
      Region: {
        type: DataTypes.STRING,
      },
      Latitude: {
        type: DataTypes.STRING,
      },
      Longitude: {
        type: DataTypes.STRING,
      },

    });
  

  
    return City;
  };