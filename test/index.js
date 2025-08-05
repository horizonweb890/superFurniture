const express = require('express');
const app = express();
const mongoose = require("mongoose")
const testRoutes = require("./routes/test")


mongoose.connect('mongodb+srv://abhishek:1f8mjN2F5ve8HuJZ@cluster0.cqwgt.mongodb.net/test')
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());

app.use('/sub', express.static('public'));

// Define your routes that are prefixed with /sub
app.get('/sub/test', (req, res) => {
    res.send("This is for deploy test");
});
app.get('/sub/hero', (req, res) => {
    res.send("This is for Hero test");
});


app.use("/sub/api", testRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
