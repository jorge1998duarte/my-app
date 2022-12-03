import React from "react";
import NoImage from "../../assets/image/no_image.png";
const ListProducts = (props) => {
  const { products } = props;

  //   {
  //     sku: "122007103600",
  //     nombre: "AIR.GRAPHIC CABALLERO NEGRO 122",
  //     idProducto: "118842",
  //     imagen:
  //       "https://res.cloudinary.com/dkkqreglm/image/upload/v1651968018/Tucan%C3%AA/IMAGENES%20ODOO/39.%20Air%20graphic%20caballero%20negro/5_q7kfhh.jpg",
  //     imagen1: "false",
  //     imagen2: "false",
  //     imagen3: "false",
  //     idTalla: "118842",
  //     nombreTalla: "Talla: XXL",
  //     inventario: 0,
  //     disponibilidad: false,
  //   },

  return (
    <div className="mx-auto">
      {products.map((product, index) => (
        <div key={index} className="card mb-2" style={{ width: "18rem" }}>
          <i className="bi bi-x-circle"></i>
          <img
            src={product.imagen ? product.imagen : NoImage}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      ))}
      <label className="form-label">
        {products?.length}/ {products?.length}
      </label>
    </div>
  );
};

export default ListProducts;
