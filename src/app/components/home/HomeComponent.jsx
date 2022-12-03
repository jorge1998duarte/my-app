import React, { useState } from "react";
import Swal from "sweetalert2";
import { buscarProducto } from "../../../services/Services";
import ListProducts from "../products/ListProducts";

const HomeComponent = () => {
  const [products, setProducts] = useState([
    {
      sku: "122007103600",
      nombre: "AIR.GRAPHIC CABALLERO NEGRO 122",
      idProducto: "118838",
      imagen:
        "https://res.cloudinary.com/dkkqreglm/image/upload/v1651968018/Tucan%C3%AA/IMAGENES%20ODOO/39.%20Air%20graphic%20caballero%20negro/5_q7kfhh.jpg",
      imagen1: "false",
      imagen2: "false",
      imagen3: "false",
      idTalla: "118838",
      nombreTalla: "Talla: S",
      inventario: 0,
      disponibilidad: false,
    },
    {
      sku: "122007103600",
      nombre: "AIR.GRAPHIC CABALLERO NEGRO 122",
      idProducto: "118839",
      imagen:
        "https://res.cloudinary.com/dkkqreglm/image/upload/v1651968018/Tucan%C3%AA/IMAGENES%20ODOO/39.%20Air%20graphic%20caballero%20negro/5_q7kfhh.jpg",
      imagen1: "false",
      imagen2: "false",
      imagen3: "false",
      idTalla: "118839",
      nombreTalla: "Talla: M",
      inventario: 0,
      disponibilidad: false,
    },
    {
      sku: "122007103600",
      nombre: "AIR.GRAPHIC CABALLERO NEGRO 122",
      idProducto: "118840",
      imagen:
        "https://res.cloudinary.com/dkkqreglm/image/upload/v1651968018/Tucan%C3%AA/IMAGENES%20ODOO/39.%20Air%20graphic%20caballero%20negro/5_q7kfhh.jpg",
      imagen1: "false",
      imagen2: "false",
      imagen3: "false",
      idTalla: "118840",
      nombreTalla: "Talla: L",
      inventario: 0,
      disponibilidad: false,
    },
    {
      sku: "122007103600",
      nombre: "AIR.GRAPHIC CABALLERO NEGRO 122",
      idProducto: "118841",
      imagen:
        "https://res.cloudinary.com/dkkqreglm/image/upload/v1651968018/Tucan%C3%AA/IMAGENES%20ODOO/39.%20Air%20graphic%20caballero%20negro/5_q7kfhh.jpg",
      imagen1: "false",
      imagen2: "false",
      imagen3: "false",
      idTalla: "118841",
      nombreTalla: "Talla: XL",
      inventario: 0,
      disponibilidad: false,
    },
    {
      sku: "122007103600",
      nombre: "AIR.GRAPHIC CABALLERO NEGRO 122",
      idProducto: "118842",
      imagen:
        "https://res.cloudinary.com/dkkqreglm/image/upload/v1651968018/Tucan%C3%AA/IMAGENES%20ODOO/39.%20Air%20graphic%20caballero%20negro/5_q7kfhh.jpg",
      imagen1: "false",
      imagen2: "false",
      imagen3: "false",
      idTalla: "118842",
      nombreTalla: "Talla: XXL",
      inventario: 0,
      disponibilidad: false,
    },
  ]);

  const handleSearch = () => {
    Swal.fire({
      title: "<h4>Buscar Producto</h4>",
      input: "text",
      inputValue: "122007103600",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonColor: "#000000",
      confirmButtonText: "Buscar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#000000",
      showLoaderOnConfirm: true,
      preConfirm: (codigo) => {
        return buscarProducto({ sku: codigo })
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data);
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `<h4>Productos Cargados con exitó</h4>`,
        });
      }
    });
  };

  return (
    <div className="m-auto text-center align-content-between">
      <div className="d-grid gap-2 col-12 mx-auto">
        <ListProducts products={products} />
      </div>
      <div className="d-grid gap-2 col-12 mx-auto pb-1">
        <button
          className="btn btn-outline-dark rounded-4"
          onClick={handleSearch}
        >
          Escanea tus productos
        </button>
      </div>
      <div className="d-grid gap-2 col-12 mx-auto pb-1">
        <button className="btn btn-outline-dark rounded-4">
          Ir a probador
        </button>
      </div>
      <div className="d-grid gap-2 col-12 mx-auto pb-1">
        <button className="btn btn-outline-dark rounded-4">
          Limpiar carrito
        </button>
      </div>
    </div>
  );
};

export default HomeComponent;
