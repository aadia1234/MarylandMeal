import express from "express";
import {registerUser} from "../../../scripts/createUser.mjs"
var router = express.Router();

router.get("/", (req, res) => {
    res.send("rrr")
});


router.post("/", (req, res) => {
    // const { firstName, lastName, email, password } = req.body;
    registerUser(req.body)
    .then((result) => res.send("Created new user"))
    .catch((err) => res.send("Unable to create new user"))
});

export default router;