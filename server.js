require('dotenv').config();

require('module-alias/register');

const express = require("express");
const cors = require("cors");
const response = require("@/middlewares/responseFormat");
const appRoute = require("@/routes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(response);

const origins = ["http://localhost:5173", "https://boybuonme.github.io"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, false);
    if (origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Fail"), false);
    }
  },
};

app.options("/api/", cors(corsOptions));

// app.get("/test-success", (req, res) => {
//   res.success(
//     {
//       message: "Hello World",
//     },
//     200
//   );
// });

// app.get("/test-error", (req, res) => {
//   throw new Error("Fail");
//   res.error(400, "Task not found", null);
// });

app.use("/api", appRoute);


app.listen(port, () => {
  console.log("Running on 127.0.0.1:" + port);
});
