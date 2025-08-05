const express = require('express');
const app = express();
const mongoose = require("mongoose")

// Serve static files under the /sub path

mongoose.connect("mongodb+srv://abhishek:1f8mjN2F5ve8HuJZ@cluster0.cqwgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", ).then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error("Failed to connect to MongoDB", err));


app.use('/sub', express.static('public'));

// Define your routes that are prefixed with /sub
app.get('/sub/test', (req, res) => {
    res.send("This is for deploy test");
});
app.get('/sub/hero', (req, res) => {
    res.send("This is for Hero test");
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
