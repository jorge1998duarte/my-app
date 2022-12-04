import React, { useEffect } from "react";
import NoImage from "../../assets/image/no_image.png";
import Swal from "sweetalert2";
import { quitarProducto } from "../../../services/Services";

const ListProducts = (props) => {
  const { products, setProducts } = props;
  const tallas = [
    {
      talla: "XS",
    },
    {
      talla: "S",
    },
    {
      talla: "M",
    },
    {
      talla: "L",
    },
    {
      talla: "XL",
    },
  ];

  useEffect(() => {
    return () => {};
  }, [products]);

  const handleSelected = ({ idProducto }, talla) => {
    setProducts(
      products.map((producto) =>
        producto.idProducto === idProducto
          ? { ...producto, talla: talla }
          : producto
      )
    );
  };

  const handleDelete = ({ idProducto, send = false }) => {
    Swal.fire({
      html: `<h4>¿Desea eliminar la prenda?</h4>`,
      confirmButtonText: "Si",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonText: "No",
      cancelButtonColor: "#000000",
    }).then(async (response) => {
      if (response.isConfirmed) {
        if (send) {
          const id = sessionStorage.getItem("id");
          await quitarProducto({
            Idregistro: id,
            Idproducto: idProducto,
          }).then(async (response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "<h4>Prenda eliminada</h4>",
                html: `La prenda con el ID:${idProducto} ha sido eliminada del carrito.`,
                showConfirmButton: false,
                timer: 2000,
              });
              setProducts(
                products.map((producto) =>
                  producto.idProducto === idProducto
                    ? { ...producto, send: !producto.send }
                    : producto
                )
              );
            }
          });
        }

        setProducts(
          products.filter((product) => product.idProducto !== idProducto)
        );
      }
    });
  };

  return (
    <div className="m-auto text-center">
      {products.map((product, index) => (
        <div
          key={index}
          className="card shadow p-3 mb-5 rounded"
          style={{ width: "18rem", height: "auto" }}
        >
          <div className="position-absolute top-0 end-0">
            <i
              className="bi bi-x-circle m-1 p-1 fs-3"
              onClick={() => handleDelete(product)}
            ></i>
          </div>
          <div className="mt-3">
            <img
              src={product.imagen ? product.imagen : NoImage}
              className="card-img-top img-fluid rounded"
              width="32px"
              height="32px"
              alt="..."
            />
          </div>
          <div className="card-body">
            <p className="card-text">
              {product?.nombre}
              <br />
              <span>
                Codigo: {product.sku} Inventario: {product.inventario}
              </span>
            </p>
          </div>
          <div className="d-flex align-content-around">
            <span className="m-2 pl-1 fs-3">TALLA: {product.talla}</span>
          </div>
          <div className="align-content-between">
            {tallas.map((talla, index) => (
              <button
                className={`btn ${
                  product?.talla === talla.talla
                    ? "btn-dark"
                    : "btn-outline-dark"
                } rounded-0 m-1`}
                key={index}
                onClick={() => handleSelected(product, talla.talla)}
              >
                {talla.talla}
              </button>
            ))}
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
