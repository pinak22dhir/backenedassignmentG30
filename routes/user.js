const express = require("express");
const { 
   signup,login
} = require("../controllers/user.js");

const router = express.Router();
// Define routes for different operations
router.post("/signup", signup);
router.post("/login", login);


module.exports = router;
