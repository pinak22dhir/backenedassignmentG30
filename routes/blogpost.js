const express = require("express");
const { 
    insert, 
    getall, 
    getone, 
    getfiltered, 
    updateoneblog, 
    putnewblog, 
    deleteoneblog ,deleteauthor,
} = require("../controllers/blogpost.js");

const router = express.Router();

// Define routes for different operations
router.post("/insertone", insert);
router.get("/all", getall);
router.get("/:id", getone);
router.get("/:title/:author", getfiltered);
router.delete("/del/:author", deleteauthor);
router.put("/put/:id", putnewblog);
router.delete("/del/:id", deleteoneblog);

module.exports = router;
