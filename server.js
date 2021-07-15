var express = require("express");
var bodyParser = require("body-parser");
var app = express();
// mongo server creation
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@cluster0.y0nou.mongodb.net/loginuserDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongo server running");
  })
  .catch((err) => {
    console.log(err);
  });
var User = require("./mongo");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/home.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/pages/login.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/pages/signup.html");
});

app.post("/signup", (req, res) => {
  if (req.body.password === req.body.repeat_password) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    newUser.save((err) => {
      err ? console.log(err) : res.send("Succesfully Registered new User");
    });
  } else {
    res.send("Password does not match");
  }
});

app.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;

  User.findOne({ username: username }, (err, foundResult) => {
    if (err) console.log(err);
    else {
      if (foundResult === null) res.send("Username not Registered");
      else {
        if (foundResult.password === password) res.send("You are Logged in.");
        else {
          res.send("Password is Incorrect");
        }
      }
    }
  });
});

app.listen(process.env.PORT || 3000, console.log("server running on http://localhost:3000"));
