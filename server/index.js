const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
// var path = require("path");
// var serveStatic = require("serve-static");

// app.use(serveStatic(path.join(__dirname, "dist")));
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
// "mongodb+srv://admin:admin1234@cluster0.zxr2j.mongodb.net/figura_appointment?retryWrites=true&w=majority";

mongoose.connect(uri);

// app.get("/getUsers", (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

app.get("/getDates", async (req, res) => {
  try {
    const dates = await UserModel.find({}).select("booking_date status");
    res.json(dates);
  } catch {
    res.status(404).send({ error: "not found" });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch {
    res.status(404).send({ error: "not found" });
  }
});

app.post("/createUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
  } catch {
    res.status(404).send({ error: "not found" });
  }
});

// app.get("/getId/id", async (req, res) => {
//   const userId = await UserModel.findById(req.params.id);
//   res.send({ data: userId });
// });

app.get("/status/:id", async (req, res) => {
  try {
    const userId = await UserModel.findById(req.params.id);
    res.json(userId);
  } catch {
    res.status(404).send({ error: "not found" });
  }
});

app.patch("/status/:id", async (req, res) => {
  try {
    const userId = await UserModel.findById(req.params.id);
    Object.assign(userId, req.body);
    userId.save();
    res.json(userId);
  } catch {
    res.status(404).send({ error: "not found" });
  }
});

app.delete("/status/:id", async (req, res) => {
  try {
    const userId = await UserModel.findById(req.params.id);
    await userId.remove();
    res.send({ data: true });
  } catch {
    res.status(404).send({ error: "not found" });
  }
});

//http://localhost:3001/getId/61d2e18b42218236b7f8e754

app.listen(PORT, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
