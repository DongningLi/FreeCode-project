require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// 2. create a schema
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  userId: String,
  username: String,
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});
const userSchema = new Schema({
  username: String,
});

//* Models
const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);

//create user
app.post("/api/users", async function (req, res) {
  const inputUsername = req.body.username;

  const newUser = new User({
    username: inputUsername,
  });

  try {
    const user = await newUser.save();
    res.json({ username: user.username, _id: user._id });
  } catch (err) {
    console.error("Error:", err);
    // res.status(500).json({ error: "Error saving user" });
  }
});

//get all users
app.get("api/users", function (req, res) {
  User.find({}, (err, users) => {
    if (err) return console.error("error:", err);
    res.json(users);
  });
});

//add new exercise
app.post("/api/users/:_id/exercises", async function (req, res) {
  const userId = req.params._id;
  console.log(userId);
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date || new Date().toDateString();

  try {
    const userINDB = await User.findById(userId);
    const newExercise = new Exercise({
      userId: userId,
      username: userINDB.username,
      description: description,
      duration: duration,
      date: date,
    });

    const exercise = await newExercise.save();
    res.json({
      _id: exercise._id,
      username: userINDB.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    });
  } catch (err) {
    console.error("Error:", err);
  }
});

//get logs
app.get("/api/users/:_id/logs", async function (req, res) {
  const userId = req.params._id;
  const from = req.query.from || new Date(0).toDateString();
  const to = req.query.to || new Date().toDateString();
  const limit = req.query.limit || 0;

  const user = await User.findById(userId);

  const exercise = await Exercise.find({
    userId: userId,
    date: { $gte: from, $lte: to },
  })
    .select("description duration date")
    .limit(limit);

  const logArray = exercise.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };
  });

  res.json({
    _id: logArray._id,
    username: user.username,
    count: logArray.length,
    log: logArray,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
