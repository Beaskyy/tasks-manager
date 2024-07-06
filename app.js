const express = require("express");
const app = express();
require("dotenv").config();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

require("./db/connect");

app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use("/api/v1/tasks/:id", tasks);
const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`running on port ${port}..`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
