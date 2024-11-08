import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {

    const auth = true

    if(!auth) return <Navigate to={"/login"}/>
    return <Outlet/>
}
