const express = require("express");
const app = express();
require("dotenv").config();
const {PORT} = process.env
const { dbConnection } = require("./config/config")

dbConnection()

app.use(express.json())

app.use('/users', require('./routes/users'))
app.use('/tasks', require('./routes/tasks'))

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

module.exports = app;