const express = require("express");
const connectDB = require("./src/db/index.js");
const categoryRoutes = require("./src/routes/proudctCategory.routes.js"); 
const productRoutes = require("./src/routes/product.routes.js");
const contactRoutes = require("./src/routes/contact.routes.js");
const userRoutes = require("./src/routes/user.routes.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: "*", credentials: true })); 


app.use('/sub', express.static('public'));

app.get('/sub/test', (req, res) => {
    res.send("This is for deploy test");
})

app.use("/api/v1", categoryRoutes);
app.use("/api/v1", productRoutes); 
app.use("/api/v1", contactRoutes);
app.use("/api/v1", userRoutes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
