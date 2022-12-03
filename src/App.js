import "./App.css";
import { Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { terminarRegistoCliente } from "./services/Services";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate("/login", { replace: true });
    }
  }, []);

  const handleClose = async () => {
    Swal.fire({
      html: `<p className="text-dark fs-1">¿Desea cerrar la sesión?</p>`,
      confirmButtonText: "Si",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonText: "NO",
      cancelButtonColor: "#000000",
    }).then(async (response) => {
      if (response.isConfirmed) {
        const id = sessionStorage.getItem("id");
        await terminarRegistoCliente({ IdRegistro: id })
          .then(async (response) => {
            if (response.status === 200) {
              sessionStorage.clear();
              Swal.fire({
                html: `<p className="text-dark fs-1">${response.data} al Cerrar Sesión</p>`,
                showConfirmButton: false,
                timer: 1000,
              });
              navigate("/login", { replace: true });
            }
          })
          .catch(async (error) => {
            sessionStorage.clear();
            navigate("/login", { replace: true });
          });
      }
    });
  };

  return (
    <div className="container-fluid p-0">
      <div className="m-0 pt-4 bg-dark pb-1">
        <div className="m-auto text-center">
          <div className="text-white text-justify align-text-bottom fs-2">
            Bienvenido, Usuario <br /> Escoge tus prendas
          </div>
        </div>
      </div>
      <div className="m-auto top-25 w-75 pt-5 vh-100">
        <Outlet />
        <div className="d-grid gap-2 col-12 mx-auto p-5 end">
          <button
            className="btn btn-default align-self-baseline rounded-4"
            onClick={handleClose}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
