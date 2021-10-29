const Express = require("express");
//We require the use of the express npm pckg that we installed in our dependencies.
const app = Express();
//We create an instance of express to fire off an Express()function which is exported by the Express module to create an Express app.
const dbConnection = require("./db");
//Create a db variable that imports the db file.
const controllers = require("./controllers");
//we import the controllers as a bundle through the object that we just exported in the index.js and store it in a variable called controllers.

app.use(Express.json());
//tells the app that we want json to be used as we process this request. 

app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server')
}); //if you GET http://localhost:3000/test, you will see this message in postman. res.send is an Express function. res packages up the response object and .send method sends off the response.

app.use("/journal", controllers.journalController);
//We call app.use and in the first parameter create a base URL called /journal to make our base URL "http://localhost:3000/journal"
//the second parameter for the use() function, we pass in the controllers object and use dot notation to access the desired journalController. This means that all routes created in the journalcontroller.js file will be sub-routes.

app.use("/user", controllers.userController);
//We call upon the use() method from the Express framework and create a route to access any future functions in our usercontroller.js. The string, '/user', is setting up the endpoint our URL will need to include to access a controller. We use dot notation to step into the bundle of controllers we imported on line 7 to grab the value from the userController key in the controllers/index.js file.

dbConnection.authenticate()
//we use the db var to access the sequelize instance and its methods from the db file. Then we call upon the authenticate() method. This is an asynchronous method that returns a promise.
    .then(()=> dbConnection.sync())
    //We use promise resolvers (.then) to access the returned promise and call the sync() method. This will ensure we synch all defined models to the database.
    .then(() => {       //we wrap this func inside a larger method to confirm we are connected.
    app.listen(3000, () => {
        //app.listen will use express to listen for connections on the given path. The given path is localhost:3000
        console.log(`[Server]: App is listening on 3000.`);
        //We call an anonymous callback function when the connection happens by logging it. This allows us to see a message w/the port that server is running on. 
    });
    })
    .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
    }); //We use a promise rejection that fires off an error if there are any errors.


//	1. App.use in app.js is the base URL after the http://localhost:3000/
// 	2. Whatever you list as the first param will be the base. 
// 	3. In journalcontroller.js, whatever you list as the first param of the router.get func will be the sub route.
// http://localhost:3000/journal/about