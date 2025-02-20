import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    name: process.env.COOKIE_NAME,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(express.json());

app.use(
  cors({
    origin: process.env.BASE_URL,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use("/api", routes);

app.listen({ port: process.env.PORT }, () =>
  console.log("Server running on port: " + process.env.PORT)
);
