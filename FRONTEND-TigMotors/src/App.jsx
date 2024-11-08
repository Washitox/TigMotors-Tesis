import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingView from "./views/public/Landing/LandingView";
import PrivateRoute from "./routes/PrivateRoute";
import LoginView from "./views/public/Login/LoginView";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingView/>}/>
        <Route path="/login" element={<LoginView/>}/>
        <Route path="/Register" element={<h3>Register</h3>}/>
        <Route path="/{id}"/>
        <Route element={<PrivateRoute/>}>
          <Route path="/admin" element={<h4>admin</h4>}/>
        </Route>
        
        
        
        
        
        
        
        
        
        
        
        
        
        <Route path="*" element={<h1>No encontrado</h1>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
