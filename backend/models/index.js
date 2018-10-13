import Sequelize from 'sequelize';

const sequelize = new Sequelize('Test', 'Test', 'test', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {
  City: sequelize.import('./city'),

};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default db;
