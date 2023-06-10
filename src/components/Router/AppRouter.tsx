import { FC } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, nonAuthRouters } from "../../utils/RouterTypes";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RouterPaths } from "../../utils/RouterTypes";
import UserPage from "../../pages/UserPage";
import UserFavorites from "../../pages/UserFavorites";
import UserProfile from "../../pages/UserProfile";
import AddNewArticle from "../../pages/AddNewArticle";
import AdminPage from "../../pages/AdminPage";
import EditArticle from "../../pages/EditArticle";
import NotConfirmedArticle from "../../pages/NotConfirmedArticle";

const AppRouter: FC = () => {
  const { isAuth, data } = useAppSelector(state => state.UserReducer)
  return (
    <>
      <Routes>
        {
          !isAuth &&
          nonAuthRouters.map(route => <Route key={route.path} path={route.path} Component={route.component} />)
        }
        {
          publicRoutes.map(route => <Route key={route.path} path={route.path} Component={route.component} />)
        }
        <Route path={RouterPaths.USERPAGE} element={<UserPage />}>
          <Route path="" element={<UserProfile />} />
          {isAuth && <Route path={RouterPaths.USERFAVORITE} element={<UserFavorites />} />}
          {data.role === "ADMIN" && <Route path={RouterPaths.EDITARTICLE} element={<EditArticle />} />}
          {isAuth && <Route path={RouterPaths.ADDNEWARTICLE} element={<AddNewArticle />} />}
          {data.role === "ADMIN" && <Route path={RouterPaths.ADMINPAGE} element={<AdminPage />} />}
        </Route>
        {data.role === "ADMIN" && <Route path={RouterPaths.NOTCONFIRMED} element={<NotConfirmedArticle />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default AppRouter