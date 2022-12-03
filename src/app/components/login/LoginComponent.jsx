import React, { useState } from "react";
import { useNavigate } from "react-router";
import { registroCliente } from "../../../services/Services";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    nombre: "cesar ruiz",
    email: "ceshum@ceshum.com",
  });

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registroCliente(state).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem("id", response.data?.id);
        navigate("/");
      }
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
