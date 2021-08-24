import express, {NextFunction, Request, Response} from "express";
import methodOverride from "method-override"
import {auth} from "express-openid-connect"
import {middleware} from "express-errorhandlers";
import {load} from "ts-dotenv";
import http from "http"
import {router} from "./secure/auth0Callback";

// env
const env = load({
  CLIENT_ID: String,
  PORT: Number,
  ISSUER_BASE_URL: String,
  SECRET: String,
  BASE_URL: String,
  SECRET_SESSION: String
});

export const app = express(); //express


app.use(express.json());
app.use(auth({
  authRequired: false,
  secret: env.SECRET_SESSION,
  clientSecret: env.SECRET,
  clientID: env.CLIENT_ID,
  baseURL: env.BASE_URL,
  issuerBaseURL: env.ISSUER_BASE_URL,
  auth0Logout: true,
  idpLogout: true,
  routes: {
    postLogoutRedirect: "/"
  },
}));
// error handle
app.use(methodOverride())
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.redirect("/failed")
});
app.use(router)


http.createServer(app).listen(env.PORT);