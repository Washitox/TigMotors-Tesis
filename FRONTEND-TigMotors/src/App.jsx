import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingView from "./views/public/Landing/LandingView";
import PrivateRoute from "./routes/PrivateRoute";
import LoginView from "./views/public/Login/LoginView";
import RegisterView from "./views/public/Register/RegisterView";
import Layout from "./views/public/Layout";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<LandingView/>}/>
          <Route path="/login" element={<LoginView/>}/>
          <Route path="/register" element={<RegisterView/>}/>
        </Route>


        

        <Route element={<PrivateRoute/>}>
          <Route path="/admin" element={<h1>Admin</h1>}/>
        </Route>

        <Route path="*" element={<h1>No encontrado</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
  