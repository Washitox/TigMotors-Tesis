import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingView from "./views/public/Landing/LandingView";
import PrivateRoute from "./routes/PrivateRoute";
import LoginView from "./views/public/Login/LoginView";
import RegisterView from "./views/public/Register/RegisterView";
import RecuperarContraseñaView from "./views/public/RecuperarContraseña/RecuperarContraseñaView";
import Layout from "./views/public/Layout";
import EdnpointNoEncontradoView from "./views/public/Endpoint no encontrado/EdnpointNoEncontradoView";
import NuevaContraseñaView from "./views/public/Nueva Contraseña/NuevaContraseñaView";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<LandingView/>}/>
          <Route path="/login" element={<LoginView/>}/>
          <Route path="/register" element={<RegisterView/>}/>
          <Route path="/reset-password" element={<RecuperarContraseñaView/>}/>
          <Route path="/new-password" element={<NuevaContraseñaView/>}/>


          {/*Rutas que pasar al privado*/}

          



        </Route>


      

      

        <Route element={<PrivateRoute/>}>
          <Route path="/admin" element={<h1>Admin</h1>}/>
        </Route>

        <Route path="*" element={<EdnpointNoEncontradoView/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
  