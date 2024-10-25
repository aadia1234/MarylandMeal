import express from "express"
import path from "path"
import bodyParser from "body-parser"
import users from "./routes/users.mjs"

var app = express()
var port = 3000;

app.listen(port, () => {
    console.log("Server running on port: ", port);
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/users", users);