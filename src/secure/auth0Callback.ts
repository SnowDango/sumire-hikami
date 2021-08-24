import {Request, Response, Router} from "express";
import {requiresAuth} from "express-openid-connect";
import {Props} from "../../views/components/App";
import {ReactDOM} from "react";

export const router = Router()

//callback
router.get("/callback", ((req: Request, res: Response) => {
  if(!req.isAuthenticated()){
    res.redirect("/failed")
  }else{
    res.redirect("/")
  }
}))

// login failed page
router.use("/failed", ((_req: Request,res: Response) => {
  res.send("access denied: without permission.")
}))

router.use("/logout",(((_req: Request, res: Response) => {
  res.oidc.login({
  }).then(data => {
    res.send(data)
  })
})))

// login success
router.use("*",requiresAuth(), (((_req: Request, res: Response) => {
  const data: Props = { title: "Sample", lang: "ja" }
  res.render("components/App",data);
})))