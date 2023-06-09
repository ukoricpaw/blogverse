import { FunctionComponent } from "react"
import TagArticles from "../pages/TagArticles";
import AdminPage from "../pages/AdminPage";
import MainPage from "../pages/MainPage";
import SingleArticlePage from "../pages/SingleArticlePage";
import Login from "../pages/Login";


export enum RouterPaths {
  TAGARTICLES = "/tagArticles/:id",
  LOGIN = "/login",
  SINGLEARTICLEPAGE = "/article/:id",
  ADMINPAGE = "admin",
  MAINPAGE = "/",
  USERPAGE = "user/:id",
  USERFAVORITE = "favorites",
  ADDNEWARTICLE = "newarticle",
  REGISTRATION = "/registration",
  EDITARTICLE = "edit/:id"
}

export type RouterType = {
  path: string;
  component: FunctionComponent;
}

const nonAuthRouters: RouterType[] = [
  {
    path: RouterPaths.LOGIN,
    component: Login
  },
  {
    path: RouterPaths.REGISTRATION,
    component: Login
  },
]

const publicRoutes: RouterType[] = [{
  path: RouterPaths.SINGLEARTICLEPAGE,
  component: SingleArticlePage
},
{
  path: RouterPaths.TAGARTICLES,
  component: TagArticles
},
{
  path: RouterPaths.MAINPAGE,
  component: MainPage
}
]

export { publicRoutes, nonAuthRouters }