const express = require("express");
const {
    createTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest
} = require("../controller/test");

const router = express.Router();

router.post("/test", createTest);        // Create
router.get("/test", getAllTests);        // Read All
router.get("/test/:id", getTestById);    // Read Single
router.put("/test/:id", updateTest);     // Update
router.delete("/test/:id", deleteTest);  // Delete

module.exports = router;
