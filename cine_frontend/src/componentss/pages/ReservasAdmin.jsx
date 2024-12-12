import React from "react";
import axios from "axios";
import { useState } from "react";
import "./reservasAdmin.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filteredReservas, setFilteredsetreservas] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = reservas.filter(
      (reservas) =>
        reservas.username.toLowerCase().includes(searchValue) ||
        reservas.fecha.toLowerCase().includes(searchValue) ||
        reservas.nombre.toLowerCase().includes(searchValue)
    );
    setFilteredsetreservas(filteredData);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/`);
    }
    axios
      .post(
        "http://localhost:3000/api/v1/users/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el header
          },
        }
      )
      .then(({ data }) => {
        console.log(data.msg.rol_id);

        if (data.msg.rol_id !== 1) {
          navigate(`/`);
        }

        axios
          .get("http://localhost:3000/api/v1/users/reservas", {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar el token en el header
            },
          })
          .then(({ data }) => {
            console.log(data.msg);
            setReservas(data.msg);
            setFilteredsetreservas(data.msg);
            console.log("reservas", reservas);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e); // Si hay un error mostrarlo en la consola
        navigate(`/`);
      });
  }, []);
  console.log("reservas", reservas);
  console.log("filteredreservas", filteredReservas);
  return (
    <div className="cuerpo">
      <div className="bodys">
        <div className="minheader">
          <h1>Historial de reservas</h1>
          <input
            className="input-search"
            type="search"
            name="searchinput"
            id="searchinput"
            onChange={handleSearch}
            placeholder="Búsqueda de Reservas"
          />
        </div>
        <br />
      </div>
      <div className="tabla">
        <table className="table">
          <tr>
            <th>Id_Reserva</th>
            <th>Nombre</th>
            <th>Película</th>
            <th>Fecha</th>
            <th>Sillas</th>
            <th>Sala</th>
            <th>Hora</th>
            <th>Costo</th>
          </tr>
          <tbody>
            {filteredReservas &&
              filteredReservas.map((reserva) => {
                return (
                  <tr key={reservas.id}>
                    <td>
                      <h2>{reserva.id}</h2>
                    </td>
                    <td>
                      <h2>{reserva.username}</h2>
                    </td>
                    <td>
                      <h2>{reserva.pelicula_nombre}</h2>
                    </td>
                    <td>
                      <h2>{reserva.fecha}</h2>
                    </td>
                    <td>
                      <h2>{reserva.sillas.toString()}</h2>
                    </td>
                    <td>
                      <h2>{reserva.sala_nombre}</h2>
                    </td>
                    <td>
                      <h2>{reserva.hora}</h2>
                    </td>
                    <td>
                      <h2>{reserva.costo}</h2>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div><br /><br /> <br /> <br /> <br /> 
    </div>
  );
};

export default Reservas;
