import React from "react";
import { useParams } from "react-router-dom"; // Para acceder al id de la URL
import { useState, useEffect } from 'react'; // para manejar los estados de las variables
import './movies.css';
import axios from 'axios' // para conectar con el servidor
const Reservar = () => {
	/**
	 * definimos una variable username que mas adelante almacenaria el nombre del usuario mediante su token
	 */
	const [username, setUsername] = useState("");
	const [isModalOpen,setIsModalOpen] = useState(false)
	const [select, setSelect] = useState([]);
	const [userData,setUserData] = useState({username:"",fecha: "",pelicula:"",sillas:"",hora:"",id_pelicula: "",user_id:"",costo:"",id_sala:""}); //estado de los parametros del formulario
	const { id } = useParams(); // traemos id = userparams() para acceder a la id
	const [valueSelect, setValueSelect] = useState("");

	const handleSelect = (e) =>{
		let valueS;
	   const {value} = e.target;
		valueS =([...valueSelect,value])
		setValueSelect(e.target.value)
		setUserData({ ...userData, [e.target.name]: value}); 
	}
	const handleChange =(e)=>{
		setUserData({...userData,[e.target.name]:e.target.value});
	// handleChange para sacar los datos de los inputs mediante el name 
	 }
	const handleChangecheckbox = (e) =>{
		let updatedSelect;
		const {value, checked} = e.target;
		if(checked){
			updatedSelect =([...select,value])
		} else{
			updatedSelect = (select.filter((o) => o !== value))
		}
		setSelect(updatedSelect);
        setUserData({ ...userData, [e.target.name]: updatedSelect }); 
	}
	const openPopup=()=>{
		setIsModalOpen(true)
	  }
	
	  const handleClose=()=>{
		setIsModalOpen(false)
	  }
	
  const peliculas = {
	// un array de peliculas que contendria la informacion de las peliculas
    1: {
      nombre: "The Wild Robot",
      sinopsis: `Esta épica aventura nos descubre el viaje de una robot (la unidad ROZZUM 7134 o «Roz») que ha naufragado en una isla deshabitada 
                y deberá aprender a adaptarse al duro entorno, forjando poco a poco relaciones con la fauna local y convirtiéndose en madre adoptiva 
                de una cría de ganso huérfana.`,
      genero: "Animación, Aventura, Ciencia Ficción",
      duracion: "102 minutos",
      clasificacion: "+10",
      imagen: "/img/images_films/the_Wild_Robot_third_poster.jpg",
	  sala: 1,
    },
    2: {
      nombre: "Transformers Uno",
      sinopsis: `TRANSFORMERS ONE es la historia jamás contada del origen de Optimus Prime y Megatron y de cómo pasaron de ser 
                hermanos de armas que cambiaron el destino de Cybertron para siempre, a convertirse en enemigos acérrimos. La primera película 
                de Transformers animada totalmente por CGI, cuenta con un reparto de voces repleto de estrellas, como Chris Hemsworth, 
                Brian Tyree Henry, Scarlett Johansson, Keegan-Michael Key, Steve Buscemi, con Laurence Fishburne, y Jon Hamm.`,
      genero: "Acción, Ciencia Ficción",
      duracion: "120 minutos",
      clasificacion: "+12",
      imagen: "/img/images_films/Transformers_One-329708311-large.jpg",
	  sala: 2,
    },
    3: {
      nombre: "No hables con extraños",
      sinopsis: `Unas vacaciones increíbles se convierten en una horrible pesadilla a manos de unos anfitriones que ocultan una oscuridad indescriptible.`,
      genero: "Terror, Suspenso",
      duracion: "120 minutos",
      clasificacion: "+16",
      imagen: "/img/images_films/No_hables_con_extraanos-102462605-large.jpg",
	  sala: 3,
    },
    4: {
        nombre: "Beetlejuice Beetlejuice",
      sinopsis: `Después de una tragedia, tres generaciones de la familia Deetz regresan a Winter River. Aún atormentada por Beetlejuice, 
                la vida de Lydia da un vuelco cuando su rebelde hija adolescente, 
                Astrid, descubre el misterioso modelo de la ciudad en el ático..`,
      genero: "Terror, Comedia",
      duracion: "105 minutos",
      clasificacion: "+13",
      imagen: "/img/images_films/beetlejuice-2-afiche-oficial-486x720.png",
	  sala: 4,
    },
    5: {
        nombre: "KILL: Masacre en el Tren",
      sinopsis: `Un pasajero en un tren a Nueva Delhi. 
                El tren pronto se convierte en un campo de batalla en el que un par de comandos se enfrentan a un ejército de bandidos invasores.`,
      genero: "Acción",
      duracion: "105 minutos",
      clasificacion: "+16",
      imagen: "/img/images_films/360 X 500 kill.jpg",
	  sala: 5,
    },
    6: {
        nombre: "Deadpool & Wolverine",
        sinopsis: `Marvel Studios presenta su mayor equivocación hasta la fecha: DEADPOOL & WOLVERINE. 
                Un apático Wade Wilson se esfuerza por adaptarse a la vida civil. Sus días como el mercenario moralmente flexible, Deadpool, han quedado atrás. Cuando su mundo se enfrenta a una amenaza existencial, reaciamente Wade debe ponerse el traje de nuevo, junto con un aún más reacio… ¿muy reacio? ¿reacísimo?... 
                Tiene que convencer a un súper-reacio Wolverine a... Mierda. Las sinopsis son tan increíblemente estúpidas.`,
        genero: "Acción, Superheroes, Comedia, Adultos",
        duracion: "128 minutos",
        clasificacion: "+18",
        imagen: "/img/images_films/Deadpool-3-poster-1.jpg",
		sala: 6,
    },
    7: {
        nombre: "Mi Villano Favorito 4",
        sinopsis: `Gru y su familia deben adoptar identidades falsas para ocultarse de un supervillano, 
                un antiguo compañero de la escuela de Gru que le guarda rencor desde pequeño y pretende convertir a la familia 
                en híbridos entre humano y cucaracha.`,
        genero: "Animación, Ciencia Ficción, Aventura, Familiar",
        duracion: "104 minutos",
        clasificacion: "+7",
        imagen: "/img/images_films/360 X 500mivillano4.jpg",
		sala: 7,
    },
    8:{
        nombre: "The Substance",
        sinopsis: `La posibilidad de la eterna juventud está al alcance de la mano. Con un nuevo producto, denominado la sustancia, la vida de cualquier persona mejoraría sustancialmente. 
                ¿Alguna vez has soñado una versión mejor de ti misma? Entonces, debes probar la sustancia. De esta forma, puedes generar otra versión de ti misma. Una versión mejorada: más joven, más bella, más perfecta. 
                Solo tienes que compartir tu tiempo con esta nueva figura. Una semana para ti, otra semana para ella en un equilibrio perfecto de siete días. Parece fácil. Solo es necesario seguir las instrucciones. 
                Claro que es inevitable pensar en las contraindicaciones. ¿Qué podría salir mal?`,
        genero: "Drama, Psicológico, Terror",
        duracion: "144 minutos",
        clasificacion: "+18",
        imagen: "/img/images_films/poster-the-substance-664ca00b33247.jpg",
		sala: 8,
    }
    
  };
  const pelicula = peliculas[id];
  

const handleSubmit = async (e) =>{
	// validaciones para poder enviar los datos de la reserva
	
	
	e.preventDefault();
	if(!userData.username || !userData.pelicula){
		alert('Inicia sesión para acceder a las funciones de el aplicativo');
	}
	else if(!userData.fecha || !userData.sillas || !userData.hora){
		alert('Completa todos los campos para terminar tu reserva')
		console.log(select)
		console.log('hora desde la variable valueSelect',valueSelect);
		console.log(userData.hora);
		console.log(userData.user_id);
		console.log(userData.id_pelicula)
		console.log('Costo de las sillas',userData.costo)
	}
	else if(userData.sillas.length < 1 ){
		alert('escoje por lo menos una silla')

	}
	
	else{
		await axios.post('http://localhost:3000/api/v1/users/reservar',userData).then((res)=>{
			openPopup()
		 
		}).catch((error) => {
			console.log(error);
			alert(error.response.data.msg);
		})
	  }
	};
    
    const precio = 5000 * userData.sillas.length
	useEffect(() => { // el useEffect es una funcion que se ejecuta sola, en este caso cuando se ejecutaría cada vez que cambie el id de pelicula[pelicula]
		// obtenemos el token para acceder a los datos del usuario que está almacenado en el localStorage
		const token = localStorage.getItem("token");
		if (token) {
		  axios
			.post(
			  "http://localhost:3000/api/v1/users/profile",
			  {},
			  {
				headers: {
				  Authorization: `Bearer ${token}`,
				},
			  }
			)
			.then(({ data }) => {
			  setUsername(data.msg.username);
			  setUserData((prevData) => ({
				//con esta funcion actualizamos el estado de las otras dos propiedades
				...prevData,
				username: data.msg.username,
				pelicula: pelicula.nombre,
				id_pelicula: id,
				user_id: data.msg.id,
				costo: precio,
				id_sala: pelicula.sala
			  }));
			})
			.catch((e) => {
			  console.error("Error:", e);
			});
		} else {
		  
		}
	  }, [pelicula]);
	  
	  
	 
	 

  return (
    <main>
		
		    {isModalOpen && (
			<div className="containermodal">
            <div className='reservamodal'>
				<div className="headermodal">             
                <img src="/img/images_films/Cineimg-removebg-preview.png" alt="" width="100px" height="100px" />
				<h1>¡Reserva Exitosa!</h1> 
				<img src="/img/images_films/CineVolteado.png" width="100px" height="100px"/>
				
				</div>  
				<div className="ReservaContenido">
				<div className="datos">
				<h2>Nombre: {username}</h2> <h2>Sillas Reservadas: {userData.sillas.toString()}</h2>
				<h2>Fecha: {userData.fecha}</h2>
				<h2>Hora: {userData.hora}</h2> <h2>Costo: {userData.costo.toLocaleString("es-CO")} - Precio por silla: 5.000 COP</h2>
				<h2>Sala: {userData.id_sala}</h2>
				</div>
				<div className="peliculamodal"><br />
					<img src={pelicula.imagen}  className="imgModal" />
					<h3>{pelicula.nombre}</h3>
					<span className='closemodal' onClick={handleClose}>Cerrar</span>
				</div>
				</div>	
				

            </div>	
			</div>
            )}
        
      <section>
        <section className="ficha-tecnica">
			<ul>
				<li>
					<img src={pelicula.imagen} alt="Pelicula1" width="200px"/>{/*aca pondria la informacion de la pelicula
					dependiendo de la id en la que este la url */}
					<h3>{pelicula.nombre}</h3>
				</li>
			</ul>
		</section>
        <section className="sillas">
			<form id="reserva" className="reserva">
			<div>
				<div>
					<label >A1</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="A1"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >A2</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="A2"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >A3</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="A3"onChange={handleChangecheckbox}/>
				
				</div>
				<div>
					<label >A4</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="A4"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >A5</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="A5"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >B1</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="B1"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >B2</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="B2"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >B3</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="B3"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >B4</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="B4"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >B5</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="B5"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >C1</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox"name="sillas" value="C1"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >C2</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="C2"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >C3</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="C3"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >C4</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="C4"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >C5</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="C5"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >D1</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="D1" onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >D2</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="D2"onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >D3</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="D3" onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >D4</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="D4" onChange={handleChangecheckbox}/>
					
				</div>
				<div>
					<label >D5</label>
					<img src="/img/images/silla.png" alt="" width="75px"/>
					<input type="checkbox" name="sillas" value="D5" onChange={handleChangecheckbox}/>
					
				</div>
            </div>
			    <h3>Escoja la fecha de la reserva</h3>
				<input type="date" name="fecha" value={userData.fecha} onChange={handleChange} className="Inputfecha" /><br /><br />{/* con esto actualizamos los valores de los estados que 
				seran enviados a la base de datos posteriormente*/}	
				<h3>Elija una hora disponible</h3>
				<select name="hora" onChange={handleSelect} >
                <option>Horas disponibles</option>
                <option value="5:00 PM"  >5:00 PM </option>
                <option value="6:30 PM" >6:30 PM</option>
                <option value="8:30 PM"  >8:30 PM</option>
                <option value="10:30 PM" >10:30 PM</option>
                </select><br /><br /><br /><br />
				<button type="submit" onClick={handleSubmit}>Confirmar Reserva</button> {/*lleva a la funcion handle
				submit que enviara los datos a la base de datos y nos dara su respecitva respuesta */}
				
				<br/>
			</form>
		</section>
      </section>
    </main>
  );

};

export default Reservar;