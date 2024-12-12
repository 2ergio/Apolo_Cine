import { useEffect } from 'react';
import { useState,useRef } from 'react'
import "./inicioSesion.css";
import axios from 'axios'
import { IonIcon } from "@ionic/react"; // Componente para usar Ionicons
import {
  logoFacebook,
  logoTwitter,
  logoInstagram,
  logoTiktok,
  personOutline,
  mailOutline,
  callOutline,
  starOutline,
  lockClosedOutline,
} from "ionicons/icons"; // Iconos necesarios
/**
 * inicio de sesion y registro, aca se crearia el diseño de cada formulario que funcionaria 
 * para registrarse y iniciar sesion, se importa axios para conectar al backend y useState,useRef para manejar
 * los estados de las constantes
 */



const InicioSesion = () => {
// variable que manejaria el estado del contenedor para la animacion entre formularios
const contenedorRef = useRef(null);
// Obtener el formulario y los campos de entrada (Registro)
const [userData,setuserData] = useState({username:"",email:"",telefono:"",fecha_nacimiento:"",password:"",password2:""});
// Obtener el formulario y los campos de entrada (login)
const [user,setUserData]= useState({email:"",password:""});
  localStorage.removeItem('token');
const handleChange=(e)=>{
  // handlechange que serviria para almacenar el valor de los inputs del registro
    setuserData({...userData,[e.target.name]:e.target.value});

  }
  // handleChange serviria para almacenar el valor de los inputs del login
 const handleChange2=(e)=>{
    setUserData({...user,[e.target.name]:e.target.value});

 }

// (registro)
// validaciones
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!userData.username || !userData.email || !userData.telefono || !userData.fecha_nacimiento || !userData.password || !userData.password2){
      alert('Todos Los Campos son obligatorios');
    }
    else if(userData.password !== userData.password2){
        alert('Error: Las contraseñas no coiciden');
    }
    else{
      await axios.post('http://localhost:3000/api/v1/users/register',userData).then((res)=>{
        console.log(res.data);
        alert('Usuario Registrado Correctamente');
        window.location.reload() // recarga la pagina
      })
    }
  }
// (iniciodeSesion)
const handleVerify= async (e) =>{
    e.preventDefault();
    if(!user.email || !user.password){
        alert('Todos Los Campos son obligatorios')
    }
    else{
    try{
      // trae el token y redirige al index en donde se verificara si el usuario esta conectado o no
        await axios.post('http://localhost:3000/api/v1/users/login',user).then((res)=>{
            alert('Bienvenido');
            console.log(res.data);
            localStorage.setItem('token', res.data.msg);
            window.location.href = '/';
        
    })
    // en caso de error lanza una alerta con el mensaje
}catch(error){
    console.log(error);
    alert(error.response.data.error);
}

}
}






  // movimiento entre los formularios
  const toggleForm = (addToggle) => {
    if (contenedorRef.current) {
      if (addToggle) {
        contenedorRef.current.classList.add("toggle");
      } else {
        contenedorRef.current.classList.remove("toggle");
      }
    }
  };

  return (
    <div className="bodys">
      <div ref={contenedorRef} className="contenedor">
        <div className="cont-form">
          <form className="sign-up" id="formreg">
            <h2>Registrarse</h2>
            <div className="redes">
              <IonIcon icon={logoFacebook} />
              <IonIcon icon={logoTwitter} />
              <IonIcon icon={logoInstagram} />
              <IonIcon icon={logoTiktok} />
            </div>
            <span>Use su correo electrónico para registrarse</span>
            <div className="cont-input">
              <IonIcon icon={personOutline} />
              <input type="text" id="nombre" name='username' placeholder="Nombre"value={userData.nombre} maxLength={15} onChange={handleChange}  />
            </div>
            <div className="cont-input">
              <IonIcon icon={mailOutline} />
              <input type="email" id="email" placeholder="Correo" name='email' value={userData.email} onChange={handleChange}/>
            </div>
            <div className="cont-input">
              <IonIcon icon={callOutline} />
              <input type="text" id="telefono" placeholder="Teléfono" name='telefono' value={userData.telefono} maxLength={9} onChange={handleChange}/>
            </div>
            <div className="cont-input">
              <IonIcon icon={starOutline} />
              <input
                type="date"
                id="fecha_nacimiento"
                placeholder="Fecha de nacimiento"
                name='fecha_nacimiento'
                value={userData.fecha_nacimiento} onChange={handleChange}/>
            </div>
            <div className="cont-input">
              <IonIcon icon={lockClosedOutline} />
              <input type="password" id="password" placeholder="Contraseña" name='password'value={userData.password} maxLength={10} onChange={handleChange}  />
              
            </div>
            <div className="cont-input">
              <IonIcon icon={lockClosedOutline} />
              <input
                type="password"
                id="contraseña2"
                name='password2'
                placeholder="Repita su Contraseña"
                maxLength={10}
                value={userData.password2} onChange={handleChange}
              />
            </div>
            <button type="submit" className="button" id="reg" onClick={handleSubmit}>
              REGISTRARSE
            </button>
          </form>
        </div>

        <div className="cont-form">
          <form className="sign-in" id="inicio">
            <h2>Iniciar Sesión</h2>
            <div className="redes">
              <IonIcon icon={logoFacebook} />
              <IonIcon icon={logoTwitter} />
              <IonIcon icon={logoInstagram} />
              <IonIcon icon={logoTiktok} />
            </div>
            <span>Use su correo y contraseña</span>
            <div className="cont-input">
              <IonIcon icon={mailOutline} />
              <input
                type="email"
                placeholder="Correo"
                id="correoin"
                name="email"
                value={user.email} onChange={handleChange2} 
              />
            </div>
            <div className="cont-input">
              <IonIcon icon={lockClosedOutline} />
              <input
                type="password"
                placeholder="Contraseña"
                id="contraseñain"
                name="password"
                maxLength={10}
                value={user.password} onChange={handleChange2} 
              />
            </div>
            <p>¿Olvidaste tu contraseña?</p>
            <button type="submit" className="button" id="login" onClick={handleVerify}>
              INICIAR SESIÓN
            </button>
          </form>
        </div>

        <div className="cont-welcome">
          <div className="welcome-sign-up welcome">
            <h2>TEATRO APOLO</h2>
            <h3>¡Bienvenido!</h3>
            <p>
              Ingrese sus datos personales para usar todas las funciones del
              sitio
            </p>
            <button
              className="button"
              onClick={() => toggleForm(true)}
            >
              Iniciar Sesión
            </button>
          </div>
          <div className="welcome-sign-in welcome">
            <h2>TEATRO APOLO</h2>
            <h3>¡Hola!</h3>
            <p>
              Regístrese con sus datos personales para usar todas las funciones
              del sitio
            </p>
            <button
              className="button"
              onClick={() => toggleForm(false)}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// exportamos
export default InicioSesion;