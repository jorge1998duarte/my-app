import React, { useState } from "react";
import { useNavigate } from "react-router";
import { registroCliente } from "../../../services/Services";
import Swal from "sweetalert2";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    nombre: "",
    email: "",
  });

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registroCliente(state)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: `<h4>Inicio de Sesión Correcto</h4>`,
            showConfirmButton: false,
            icon: "success",
            timer: 1000,
          });
          sessionStorage.setItem("id", response.data?.id);
          navigate("/");
        }
      })
      .catch((error) => {
        Swal.fire({
          title: `<h4>Inicio de Sesión Incorrecto</h4>`,
          text: "<h4>El nombre o el correo son invalidos</h4>",
          showConfirmButton: false,
          icon: "error",
          timer: 1000,
        });
      });
  };

  return (
    <div className="m-auto text-center">
      <div className="align-content-around">
        <form onSubmit={handleSubmit}>
          <div className="d-grid gap-2 col-12 mx-auto">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              className="form-control rounded-4"
              name="nombre"
              id="nombre"
              type="text"
              value={state.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2 col-12 mx-auto">
            <label htmlFor="email" className="form-label">
              Correo:
            </label>
            <input
              className="form-control rounded-4"
              name="email"
              id="email"
              type="email"
              value={state.email}
              onChange={handleChange}
              pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$"
              required
            />
          </div>
          <div className="d-grid gap-2 col-12 mx-auto pt-5">
            <button className="btn btn-outline-dark rounded-4" type="submit">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
