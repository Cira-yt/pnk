import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterPropietario from './pages/RegisterPropietario';
import RegisterGestor from './pages/RegisterGestor';
import Recuperar from './pages/Recuperar';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro-propietario" element={<RegisterPropietario />} />
              <Route path="/registro-gestor" element={<RegisterGestor />} />
              <Route path="/recuperar" element={<Recuperar />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;