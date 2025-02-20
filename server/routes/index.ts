import express from "express";
import user from "./user";
import authenticate from "./authenticate";

const routes = express.Router();

routes.use("/authenticate", authenticate);
routes.use("/user", user);

export default routes;
