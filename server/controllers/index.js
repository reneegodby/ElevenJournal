module.exports = {
    //We are exporting this file as a module. More specifically, we are exporting everything as an object.
    userController: require('./userController'),
    //We import the usercontroller.js and assign it to a variable called userController and at the same time, we export all of the controllers in this file. 
    journalController: require('./journalcontroller'),
    //We define a property called journalController. The value of this property is the import of the journalcontroller file.
};

// We are implementing CommonJS, a module formatting system that is built into Node. This practice helps us organize our modules, in this case files, routes, and dependencies, as well as manage the access to the logic. 




