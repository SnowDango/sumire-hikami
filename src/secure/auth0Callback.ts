import {Request, Response, Router} from "express";
import {requiresAuth} from "express-openid-connect";

export const router = Router()

// login failed page
router.use("/failed", ((req: Request,res: Response) => {
  res.send("access denied: without permission.")
}))

// login success
router.use("*",requiresAuth(), (((req: Request, res: Response) => {
  res.send(req.oidc.user)
})))