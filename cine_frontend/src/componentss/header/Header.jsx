import React from "react";
import { useState, useEffect } from 'react';
import './cssHeader.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
/*Primer componente, foooter, se exporta para ser utilizado en otras partes del codigo */

/*Header, aca se importan los diferentes paquetes de react, usenavigate para navegar entre componentes
  y useState, useEffect para manejar los estados de las variables, tambien se importa axios para la con
  exion con la base de datos */
const Header = () => {
  const [reservas, setReservas] = useState("")
  const [login,setLogin] = useState(<button onClick={() => navigate(`/InicioSesion`)}>INICIO DE SESION</button>)
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario

  const [cerrarSesion, setCerrar] = useState(""); // Estado para el botón de cerrar sesión

  const navigate = useNavigate(); // Navegación entre páginas

  /*en esta primera parte se declaran diferentes variables que manejarian un estado nulo, luego despues de 
    un evento estas variables tendrian sus respectivo estado*/

  const SesionCerrar = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate(`/InicioSesion`);
    window.location.reload(); // Recargar la página para actualizar el estado
    /* esta funcion tiene el evento de borrar el jwt para sacar "el usuario" del sistema
      removiendo el token, interrumpira las diversos estados que se veran a continuacion*/
  };
  

  // useEffect para cargar el perfil del usuario solo si el token está presente
  // el useEffect se ejecuta solo al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay un token, realizamos la petición a la API para obtener el perfil
      axios.post('http://localhost:3000/api/v1/users/profile', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      })
      .then(({ data }) => {
        

        if(data.msg.rol_id === 1){
          // obteniendo la informacion de la peticion, obtenemos el usuario con sus diferentes
          // propiedades, aqui mira la id y si la id es =1 osea admin, entonces le agregara un nuevo
          // boton el cual le servira para poder acceder a la ruta en donde podra observar las reservas 
          // de los clientes
          setReservas(<button onClick={() => navigate(`/ReservasAdmin`)}>Reservas</button>)
          //console.log(reservas);
        }
        setUsername(data.msg.username + '! '); // Actualizar el nombre de usuario
        //console.log(data);
        setCerrar(<button onClick={SesionCerrar}>CERRAR SESION</button>); // Mostrar el botón de cerrar sesión
        setLogin("");// borramos el boton de login
        
      })
      .catch((e) => {
        console.log(e); // Si hay un error mostrarlo en la consola
        setUsername(""); // Limpiar el nombre de usuario en caso de error
        setCerrar(""); // Limpiar el botón de cerrar sesión
      });
    } else {
      // Si no hay token, limpiar los estados
      setUsername(""); 
      setCerrar(""); // Limpiar el botón de cerrar sesión
    }
  }, []); // Solo ejecuta al cargar el componente

  // esta variable servira para confirmar el estado del usuario dependiendo si hay
  // un usuario conectado o no, esto gracias al token, si no existe token, mostrara usuario desconectado
  let Estado = username;
  if(Estado){
      Estado = <h1>Estado:Conectado</h1>
    
  }else{
    
      Estado = <h1>Estado:desconectado</h1>
    
  }
  
    
    return(
        <header>
      {/* Menú desplegable */}
      <nav className="btnmenu">
        <div className="dropdown">
          <button id="btnmenu">MENU</button>
          <div className="dropdown-content">
            <button onClick={() => navigate(`/`)}>CARTELERA</button><br />
            <button onClick={() => navigate(`/Contactenos`)}>CONTACTO</button> <br />
            {login} {/*boton de login que seria borrado en caso de que el usuario este conectado*/}
            {reservas} <br />
            {cerrarSesion} {/*boton de cerrar sesion que serviria para desconectarse del servicio, (borrando el token)*/}
            
          </div>
        </div>
        <h1>¡Bienvenido { username ||'Al Cine Apolo!'}</h1><br /> {/*si existe username muestra
        Bienvenido {user} de lo contrario solo apareceria bienvenido al cine apolo*/}
        {Estado} {/*el estado que mostraria si el usuario esta o no conectado*/}
      </nav>
      
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="titulo">
          <h1>TEATRO APOLO</h1>
        </div>
        <div>
        
          
          
        </div>
      </nav>
    </header>
  );
};


// se exporta para ser reutilizado en otras partes del codigo
export default Header;