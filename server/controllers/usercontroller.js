const { UniqueConstraintError } = require("sequelize/lib/errors");
const router = require("express").Router();
//We import the Express framework and access the Router() method, assigning it to a variable called router.
// in our journalcontroller.js we can see this same code split up over two lines, separating the import of the framework and the access of the method.

const { UserModel } = require("../models");
//We use object deconstructing to import the user model and store it in UserModel variable. It is convention to use Pascal casing (uppercase on both words) for a model class with Sequelize.

const jwt = require("jsonwebtoken");
//imports the jwt package (authentication)

const bcrypt = require("bcryptjs");

const User = require("../models/user");
//We already build out the User model in models.user.js. This User model has two (2) key-value pairs: an email address and a password. Let's build a controller which we can use to fill our database with users!

router.post("/register", async (req, res) => {
//we use the router obj by using the router var to get access into the Router()obj methods.
//we call post() method which allows us to complete an HTTP Post req. We pass 2 arguments. "/register" is the path. the (req, res) is the handler function. It gets called when app receives a request to a specific route and HTTP method. 

let { email, password } = req.body.user;
// We are using object deconstruction to take in and parse the request. We use the req.body middleware provided by Express and append two properties or key-value pairs to it. This is what we're sending to the database. req is the actual request, and data is where our data is being held. user is a property of body, while email and password are properties of user.
//In postman the send button fires off req. The empty space where we type our user object is the body and will store the user object into our database.

try {
  //wrap our code in a try...catch statement. Try...catch statements are a part of JavaScript that allows a section of code to be attempted.
    const User = await UserModel.create({
      //we use the UserModel var we created in line 5 to access the model in users.js
      //.create() is a Sequelize method that allows us to create an instance of the User model and send it to the db.
      //When we communicate with or query from a model in our database, this action returns a Promise. We can capture this Promise with the async keyword when successful.
      //We know our await holds the value of our promise data. In our case, the newly created user email and password sent to PGAdmin. We want the ability to readily call the data so it can be used or displayed thus we assign it to a variable named User.
      email,
      password: bcrypt.hashSync(password, 13),
      //these have to match models/user.js
      //we call upon our bcrypt var, which is referring to the bcryptjs dependency we imported earlier. The hashSync() function has 2 arguments. First is the string we want hashed. The second is the number of times we want the first argument salted. Default is 10

    });

    let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    //First, we create a variable called token . Once created, this will store the token.
    //Then, we call upon our jwt variable, which is referring to the jsonwebtoken dependency we installed earlier.
    //User refers to the var we created on line 22 which captures the promise when we create a new user.
    //10.3 for breakdown of tokens

      res.status(201).json({
      message: "User successfully registered",
      user: User,
      SessionToken: token
      //The same data that that was added to the database and stored in the User variable (see line 19) is now being sent to the client and stored in a user property. user is the key, User is the value
      //We have added a key of sessionToken and pass it the value of the token.
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      //If the error is an instance of the a UniqueConstraintError (we imported that variable from sequelize at the top of our file), then create a different response. This response will have a status code of 409 and a message that says that the email is already in use. If it is not a UniqueConstraintError, then throw our normal 500 error.

      res.status(409).json({
        //In our response, rather than res.send(), we will invoke two methods: .status() and .json() method.
        //.status() allows us to add a status code to a response.
        //.json will package our response as json.
        message: "Email already in use",
      });
    } else {
      res.status(500).json({
        message: "Failed to register user",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  //We use the Express router object and call the post() method. We choose to go with a post() method because we log in, we are still sending data to the database.

  let { email, password } = req.body.user;
  //When users log in to their account, we need two (2) things from them. Their email and password. We use object deconstruction to pull the email and password from the request. 

  try {
    //We wrap our functionality in a try...catch statement. The try...catch statement allows our code to attempt to execute a block of code in the try portion. If that throws an exception and fails, it will run the code in the catch block.
    const loginUser = await UserModel.findOne({
    //After waiting (await) for the data to come back, we store the retrieved data in a variable called loginUser.
    //The findOne() method is a Sequelize method that does exactly what it says: it tries to find one element from the matching model within the database that we tell it to look for. This is called Data Retrieval.  In our case, we are looking at our UserModel. We use the await keyword in order to run this code asynchronous.

      where: {
        //We can filter what we want to locate from our database with a where clause. where is an object within Sequelize that tells the database to look for something matching its properties. 
        email: email,
        //In our case, we want to find a user that has a property of email whose value matches the value we send through our request (user@email.com). We are looking in the email column in the user table for one thing that matches the value passed from the client. 
      },
    });
    if (loginUser) {
      let passwordComparison = await bcrypt.compare(password, loginUser.password);
      //We use bcrypt to encrypt the supplied password and compare it to the hashed value, the password in the database.
      //In our first argument, we pull in the password value from the current request when the user is signing up
      //The second argument pulls the hashed password value from the database

      if (passwordComparison){
        //If passwordComparison is true, meaning the hashed password in the database matches the one that has been entered, then run the remaining code in order to create a token and build the response.

      let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

      res.status(200).json({
        user: loginUser,
        message: "User successfully logged in!",
        SessionToken: token
      });
    } else{
      res.status(401).json({
        message: "Incorrect email or password"
      })
      }

    } else {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed to log user in",
    });
  }
});

module.exports = router;
// We export the module for usage outside of the file.