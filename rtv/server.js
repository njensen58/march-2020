const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressJwt = require("express-jwt")
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(
  `mongodb://localhost:27017/rtv-repo`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to the DB")
);

app.use("/auth", require("./routes/authRouter.js"));
app.use("/api", expressJwt({ secret: process.env.SECRET }));
app.use("/api/issue", require("./routes/issueRouter.js"))
app.use("/api/comment", require("./routes/commentRouter.js"))



app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
