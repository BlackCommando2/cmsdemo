import './App.css';
import { useState } from 'react';
import { ContextProvider } from './Context';
import Home from './viewPages/home';
import Contact from './viewPages/contact';
import Products from './viewPages/products';
import AboutUs from './viewPages/aboutUs';
import AdminPanel from './viewPages/adminPanel';
import LoginPage from './viewPages/loginPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [login, setLogin] = useState(true);
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          {login &&
            <Route path="/admin-panel" element={<AdminPanel />} />
          }
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
