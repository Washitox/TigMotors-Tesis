import { Theme } from "@radix-ui/themes"; 
import "@radix-ui/themes/styles.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

    <Theme>
      <App />
    </Theme>
      
)

