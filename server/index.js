import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressJwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import { auth } from "express-openid-connect";

import { products } from "./data.js";
const app = express();
dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dev-gxi74wio43jtbv4y.us.auth0.com",
    ],
  })
);

// const jwtCheck = auth({
//   issuerBaseURL: "https://dev-gxi74wio43jtbv4y.us.auth0.com",
//   secret: "a long, randomly-generated string stored in env",
//   baseURL: "http://localhost:5000",
//   clientID: "nrysZJOrekZUNPTHtZNGojguDa0eIpho",
// });

const jwtCheck = auth({
  audience: "hello123456",
  issuerBaseURL: "https://dev-gxi74wio43jtbv4y.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

app.use(jwtCheck);

// const checkJwt = expressJwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ["RS256"],
// });

app.get("/", (req, res) => {
  res.send(`<h1>React Express Auth0</h1>`);
});

app.get("/products", jwtCheck, (req, res) => {
  res.json({
    data: products,
  });
});

app.post("/callback", (req, res) => {
  res.send("callback");
});

app.get("/hello", jwtCheck, (req, res) => {
  res.status(200).json("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
