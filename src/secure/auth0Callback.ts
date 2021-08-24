import {Request, Response, Router} from "express";
import {requiresAuth} from "express-openid-connect";

export const router = Router()

router.get("/callback", ((req: Request, res: Response) => {
  if(!req.isAuthenticated()){
    res.redirect("/failed")
  }else{
    res.redirect("/")
  }
}))

// login failed page
router.use("/failed", ((req: Request,res: Response) => {
  res.send("access denied: without permission.")
}))

router.use("/logout",(((req: Request, res: Response) => {
  res.oidc.logout;
})))

// login success
router.use("*",requiresAuth(), (((req: Request, res: Response) => {
  res.send(req.oidc.user)
})))