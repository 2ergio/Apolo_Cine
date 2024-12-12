import React from "react";
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

import './movies.css';
// ficha tecnica, se importa {useParams} necesario para navegar entre ids
const Fichatecnica = () => {
  const navigate = useNavigate()
  /*se define la constante id*/
  const { id } = useParams(); 
 /*se definen las peliculas siendo objetos que empiezan por una id y tendrian sus propiedades*/
  const peliculas = {
    1: {
      nombre: "The Wild Robot",
      sinopsis: `Esta épica aventura nos descubre el viaje de una robot (la unidad ROZZUM 7134 o «Roz») que ha naufragado en una isla deshabitada 
                y deberá aprender a adaptarse al duro entorno, forjando poco a poco relaciones con la fauna local y convirtiéndose en madre adoptiva 
                de una cría de ganso huérfana.`,
      genero: "Animación, Aventura, Ciencia Ficción",
      duracion: "102 minutos",
      clasificacion: "+10",
      imagen: "/img/images_films/the_Wild_Robot_third_poster.jpg",
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
    },
    3: {
      nombre: "no hables con extraños",
      sinopsis: `Unas vacaciones increíbles se convierten en una horrible pesadilla a manos de unos anfitriones que ocultan una oscuridad indescriptible.`,
      genero: "Terror, Suspenso",
      duracion: "120 minutos",
      clasificacion: "+16",
      imagen: "/img/images_films/No_hables_con_extraanos-102462605-large.jpg",
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
    },
    5: {
        nombre: "KILL: Masacre en el Tren",
      sinopsis: `Un pasajero en un tren a Nueva Delhi. 
                El tren pronto se convierte en un campo de batalla en el que un par de comandos se enfrentan a un ejército de bandidos invasores.`,
      genero: "Acción",
      duracion: "105 minutos",
      clasificacion: "+16",
      imagen: "/img/images_films/360 X 500 kill.jpg",
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
    }
    
  };

  const pelicula = peliculas[id]; // Obtiene la pelicula según el id de la URL

  return (
    <main>
      <section>
        <div className="movie">
           {/*Como en esta parte se maneja por ids, en cada texto mostraria su informacion
           dependiendo de que id sea*/}
          <img src={pelicula.imagen} alt={pelicula.nombre} />
          <h2>{pelicula.nombre}</h2>
        </div>
        <div id="sinopsis">
          <h2>Sinopsis</h2>
          <p>{pelicula.sinopsis}</p>
        </div>
        <div>
          <h2>FICHA TÉCNICA</h2>
          <ul>
            <li><strong>Género: {pelicula.genero}</strong></li>
            <li><strong>Duración: {pelicula.duracion}</strong></li>
            <li><strong>Clasificación: {pelicula.clasificacion}</strong></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <button onClick={() => navigate(`/reservar/${id}`)}>Reservar Sillas</button>
         {/*aca enviaria a otra seccion que seria la de reserva y tambien seria por ids*/}
      </section>
    </main>
  );
};

export default Fichatecnica;