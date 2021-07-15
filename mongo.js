//server creation
var mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.y0nou.mongodb.net/loginuserDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongo server running");
  })
  .catch((err) => {
    console.log(err);
  });

//schema creation
userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

//model creation
const User = new mongoose.model("User", userSchema);

module.exports = User;
