const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const databaseConnection = require("./config/databaseConnection");
const devicesRoutes = require("./routes/devices");
const HTTP_STATUS = require("./utils/httpStatus");
const { validationResult } = require("express-validator");
const { failure } = require("./utils/commonResponse");
const path = require('path');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
console.log(path.join(__dirname, 'upload/images'))
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.use("/api/devices", devicesRoutes);
app.use((req, res, next) => {
  res.status(HTTP_STATUS.NOT_FOUND).send(failure("ROUTE NOT FOUND"));
});
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .send(failure("Internal Server Error!", err.message));
});

databaseConnection(() => {
    app.listen(7001, ()=>{
        console.log('App is running at port 7001');
    });
});
