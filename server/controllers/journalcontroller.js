const Express = require("express");
//We import the Express framework and store it inside the variable Express. This instance becomes our gateway to using Express methods.
const router = Express.Router();
//We create a new variable called router. Since the Express variable gives us access into the express framework, we can access express properties and methods by calling express.methodName(). When we call Express.Router(), we are using the Express variable to access the Router() method. The Router() method will return a router object for us.

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
}); //We use the router object by using the router variable to get access into the Router() object methods. 
    // get() is one of the methods in the object, and we call it here. This method allows us to complete an HTTP GET request. We pass two arguments into the .get method.
    // The first argument '/practice' is the path. Similar to how we used the /test path to test out Postman previously.
    // The second argument is an anonymous callback function. This is also sometimes called a “handler function”. This function gets called when the application receives a request to the specified route and HTTP method. The application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.
    //Inside our callback function, we call res.send() .send() is an express method that can be called on the res or response object. Our response parameter is just a simple string.

router.get('/about', (req, res) => {
    res.send('Hey!! This is the about route!')
}); 

module.exports = router;
//We export the module for usage outside of the file.

//NOTE
//	1. App.use in app.js is the base URL after the http://localhost:3000/
// 	2. Whatever you list as the first param will be the base. 
// 	3. In journalcontroller.js, whatever you list as the first param of the router.get func will be the sub route.
// http://localhost:3000/journal/about