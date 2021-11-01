const Express = require("express");
//We import the Express framework and store it inside the variable Express. This instance becomes our gateway to using Express methods.

const router = Express.Router();
//We create a new variable called router. Since the Express variable gives us access into the express framework, we can access express properties and methods by calling express.methodName(). When we call Express.Router(), we are using the Express variable to access the Router() method. The Router() method will return a router object for us.

let validateJWT = require("../middleware/validate-jwt");
//We imported the validate-jwt middleware and assign it to a variable called validateJWT.

const { JournalModel } = require("../models");
//Import the journal model

router.get("/practice", validateJWT, (req, res) => {
  res.send("Hey!! This is a practice route!");
}); //We use the router object by using the router variable to get access into the Router() object methods.
// get() is one of the methods in the object, and we call it here. This method allows us to complete an HTTP GET request. We pass two arguments into the .get method.
// The first argument '/practice' is the path. Similar to how we used the /test path to test out Postman previously.
// The second argument is an anonymous callback function. This is also sometimes called a “handler function”. This function gets called when the application receives a request to the specified route and HTTP method. The application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.
//Inside our callback function, we call res.send() .send() is an express method that can be called on the res or response object. Our response parameter is just a simple string.
//We inject the validateJWT variable as a middleware function in the '/practice' route. It will check to see if the incoming request has a token for this specific route.

//JOURNAL CREATE//

router.post("/create", validateJWT, async (req, res) => {
  const { title, date, entry } = req.body.journal;
  const { id } = req.user;
  const journalEntry = {
    title,
    date,
    entry,
    owner: id,
  };
  try {
    const newJournal = await JournalModel.create(journalEntry);
    res.status(200).json(newJournal);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  JournalModel.create(journalEntry);
});
router.get("/about", (req, res) => {
  res.send("This is the about route!");
});

//GET ALL JOURNALS//
router.get("/", async (req, res) => {
  try {
    const entries = await JournalModel.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//GET JOURNALS BY USERS//
router.get("/mine", validateJWT, async (req, res) => {
  const { id } = req.user;
  try {
    const userJournals = await JournalModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(userJournals);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//GET JOURNALS BY TITLE//
router.get("/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const results = await JournalModel.findAll({
      where: { title: title },
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//UPDATE A JOURNAL http://localhost:3000/journal/update/8

router.put("/update/:entryId", validateJWT, async (req, res) => {
  const { title, date, entry } = req.body.journal;
  const journalId = req.params.entryId;
  const userId = req.user.id;

  const query = {
    where: {
      id: journalId,
      owner: userId,
    },
  };

  const updatedJournal = {
    title: title,
    date: date,
    entry: entry,
  };
  try {
    const update = await JournalModel.update(updatedJournal, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//DELETE A JOURNAL// http://localhost:3000/journal/delete/6

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const journalId = req.params.id;
    try {
        const query = {
            where: {
                id: journalId,
                owner: ownerId
            }
        };
        await JournalModel.destroy(query);
        res.status(200).json({ message: "Journal Entry Removed" });
    } catch (err) {
        res.status(500).json({ error:err });
    }
});

module.exports = router;
//We export the module for usage outside of the file.

//NOTE
//	1. App.use in app.js is the base URL after the http://localhost:3000/
// 	2. Whatever you list as the first param will be the base.
// 	3. In journalcontroller.js, whatever you list as the first param of the router.get func will be the sub route.
// http://localhost:3000/journal/about
