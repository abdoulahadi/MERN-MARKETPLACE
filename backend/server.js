const express = require("express");

const logger = require("morgan");

const cors = require("cors");

const path = require('path');

const app = express();
const categories = require("./config/categories.config.json");


var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(logger("dev"));

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to estm students application." });
});
app.get("/categories", (req, res) => {
  res.json(categories);
});
/**
Parti pour intégrer les require des routes
*/

require("./routes/product.route")(app);
require("./routes/vendeur.route")(app);
require("./routes/user.route")(app);
require("./routes/commande.route")(app);
const uploadsPath = path.join(__dirname, 'uploads');

app.use('/uploads', express.static(uploadsPath));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});