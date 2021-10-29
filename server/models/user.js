const { DataTypes } = require('sequelize');
//First, object destructuring is used to extrapolate the DataTypes object from the sequelize dependency.

const db = require('../db');
//We import the connection to our database that we set up in the db.js. This will unlock methods from the sequelize connection that we can call upon. 

const User = db.define('user', {
    //This is where the definition and creation of the model takes place.  We call the .define method. This is a Sequelize method that will map model properties in the server file to a table in Postgres.
    //In the first argument of the define method, we pass in the string user. This will become a table called users in Postgres. 
    //The next arguments of the define function (email and password) are objects. Any key/value pairs in the following objects will become columns of the table.
    email: {
        type: DataTypes.STRING(100),
        //DataTypes.STRING is our value for the type property of email and password. BC we define it as a string in this model, any info in that column must be a string data type. DataTypes is a param in the function brought in through Sequelize.
        allowNull: false, 
        //This is an optional property you can add. It simply means that you will be unable to send null data through. In this case since we are dealing with a string data type you will not be able to send an empty string through. 
        unique: true 
        //another optional property that means all data (in this case all emails) must be unique and you cannot have any duplicates. This is something you will often see used when a new user signs up to a website. 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
//export the user model to access it in other files and to allow sequelize to create the users table w/the email and password in the database. 
