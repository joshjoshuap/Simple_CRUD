const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();
const UserData = require("./models/userModel"); // importing  userData in userModel.js from models folder

// mongoose - mongodb connection
mongoose
  .connect(
    "mongodb+srv://admin-joshuap:081358465220123@cluster0.pzon1.mongodb.net/userDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((err) => {
    console.log("Mongoose Connection Failed");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true })); // for parsing data
app.use(express.static("public")); // accessing files in public folder
app.use(express.json());
app.use(methodOverride("_method")); // to override form PUT, DELETE
app.set("view engine", "ejs"); // to access ejs files in views folder
app.set("views", path.join(__dirname, "/views")); // to run server from other directory

// index.ejs
app.get("/", async (req, res) => {
  // Finding - Retrieving adn Displaying data
  const users = await UserData.find({});
  res.render("index", { users }); // sending index.ejs
});

// addUser.ejs
app.get("/adduser", (req, res) => {
  res.render("addUser"); // sending addUser.ejs
});

// editUser.ejs
app.get("/:id/edituser", async (req, res) => {
  const { id } = req.params; // retrieve id
  const users = await UserData.findById(id);
  res.render("editUser", { users }); // sending editUser.ejs
});

// CRUD
// Adding User
app.post("/", async (req, res) => {
  const newUser = new UserData(req.body); // Retrieve Data from addUser.ejs
  await newUser
    .save()
    .then((data) => {
      console.log("Sucessfully Added");
    })
    .catch((err) => {
      console.log("Adding Failed");
      console.log(err);
    });

  res.redirect("/"); // redirect to app.get('/') index.ejs
});

// Updating User
app.patch("/:id", async (req, res) => {
  const { id } = req.params; // retrieve id
  UserData.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  }) // Retrieve Data from editUser.ejs
    .then((data) => {
      console.log("Successfully Updated");
    })
    .catch((err) => {
      console.log("Updating Failed");
      console.log(err);
    });

  res.redirect("/"); // redirect to app.get('/') index.ejs
});

// Deleting User
app.delete("/:id", async (req, res) => {
  const { id } = req.params; // retrieve id
  UserData.findByIdAndDelete(id) // Delete data based on ID
    .then((data) => {
      console.log("Successfully Deleted");
    })
    .catch((err) => {
      console.log("Deleting Failed");
      console.log(err);
    });

  res.redirect("/"); // redirect to app.get('/') index.ejs
});

// Server Running
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log("Server is Running");
});
