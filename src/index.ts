import express, {NextFunction, Request, Response} from "express";
import methodOverride from "method-override";
import {auth} from "express-openid-connect";
import { setupReactViews } from "express-tsx-views";
import path from "path";
import {load} from "ts-dotenv";
import http from "http";
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

const viewOption = {
  viewsDirectory: path.resolve(__dirname, "../views"),
  prettify: true,
}
setupReactViews(app,viewOption)
// error handle
app.use(methodOverride())
app.use((_err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.redirect("/failed")
});
app.use(router)


http.createServer(app).listen(env.PORT);