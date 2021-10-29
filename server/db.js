const Sequelize = require('sequelize');
//Import the sequelize package and create an instance of sequelize for use in the module with the sequelize variable.

const sequelize = new Sequelize("postgres://postgres:39ab1e617e64405bb9759a2e79db761c@localhost:5432/eleven-journal");
//Use the constructor to create a new sequelize object. The constructor takes in a string which holds all of the pertinent data required to connect to the pgAdmin database, also known as a URI connection. The last property in the connection URI we've written as eleven-journal is the database name of the database in pgAdmin that we want to connect to - so that is what we'll need to name our database.

module.exports = sequelize;
//We export the module.

