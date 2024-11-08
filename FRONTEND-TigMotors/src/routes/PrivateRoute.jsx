import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {

  const auth = false

  if(!auth) return <Navigate to="/login"/>
  return <Outlet/>
  
}
