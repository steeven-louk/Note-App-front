import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import ContextProvider from './context/ContextProvider.jsx';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ContextProvider>

  <BrowserRouter>
    <App />
    <ToastContainer/>
  </BrowserRouter>
  </ContextProvider>
  </StrictMode>,
)
