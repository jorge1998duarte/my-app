import axios from "axios";
const url = "https://examen.pitayasoft.mx/api/User/";

export async function registroCliente(data) {
  const config = {
    url: `${url}Registro`,
    method: "POST",
    data: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  return await axios(config);
}

export async function buscarProducto(data) {
  const config = {
    url: `${url}BuscarProducto`,
    method: "POST",
    data: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  return await axios(config);
}

export async function terminarRegistoCliente(data) {
  const config = {
    url: `${url}TerminarRegistro`,
    method: "POST",
    data: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  return await axios(config);
}
