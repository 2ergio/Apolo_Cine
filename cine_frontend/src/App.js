/**
 * Archivo principal del frontend del proyecto donde se exportan los diferentes componentes
 * tambien se importo React-router, fundamental para manejar las rutas de los diferentes componentes
 */
import Main from './componentss/main/Main';
import NotFound from './componentss/pages/Notfound';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importar React Router
import Header from './componentss/header/Header';
import Footer from './componentss/footer/Footer';
import Fichatecnica from './componentss/pages/Fichatecnica';
import Reservar from './componentss/pages/Reservar';
import InicioSesion from './componentss/pages/InicioSesion';
import Contactenos from './componentss/pages/Contactenos';
import Reservas from './componentss/pages/ReservasAdmin';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path= "/ReservasAdmin" element= {<Reservas/>} />
        <Route path="/fichatecnica/:id" element={<Fichatecnica />} /> {/* Ruta dinamica para manejar las peliculas con id */}
        <Route path="/reservar/:id" element={<Reservar />} /> 
        <Route path="/InicioSesion" element={<InicioSesion />} />
        <Route path="/Contactenos" element={<Contactenos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
    
  
}

export default App;
