import React, { useEffect } from "react";
import NoImage from "../../assets/image/no_image.png";
import Swal from "sweetalert2";
import { quitarProducto } from "../../../services/Services";

const FittingRoom = (props) => {
  const { products, setProducts } = props;

  useEffect(() => {
    return () => {};
  }, [products]);

  const handleDelete = ({ idProducto }) => {
    Swal.fire({
      title: `<h4>¿Desea eliminar la prenda?</h4>`,
      confirmButtonText: "Si",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonText: "No",
      cancelButtonColor: "#000000",
    }).then(async (response) => {
      if (response.isConfirmed) {
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
    });
  };

  return (
    <div>
      <div>
        <h5 className="text-secondary">ESTA SON TUS OPCIONES</h5>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-2 p-0 pb-2 m-0">
        {products
          .filter((product) => product.send === true)
          .map((product, index) => (
            <div key={index} className="col-6 p-1">
              <div
                className="card h-100 rounded-0 pb-3"
                style={{
                  boxShadow: "9px 9px 16px #C9C9C9, -9px -9px 16px #EDEDED",
                }}
              >
                <img
                  src={product.imagen ? product.imagen : NoImage}
                  className="card-img-top img-fluid p-2"
                  width="32px"
                  height="32px"
                  alt="..."
                />
                <div className="card-body">
                  <p
                    className="card-text text-justify fs-10"
                    style={{
                      textAlign: "justify !important",
                      fontSize: "12px",
                    }}
                  >
                    {product?.nombre}
                  </p>
                </div>
                <div className="row d-wrap align-content-around">
                  <div className="col-8 p-0 fs-6">
                    TALLA
                    <span
                      style={{
                        background: "#000",
                        margin: "0px 2px",
                        letterSpacing: "2px",
                        padding: "0px 4px",
                        fontSize: "12px",
                        color: "#fff",
                        alignSelf: "center",
                      }}
                    >
                      {product.talla}
                    </span>
                  </div>
                  <div className="col-4 p-0 m-0 text-center">
                    <i
                      className="bi bi-trash fs-6"
                      onClick={() => handleDelete(product)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FittingRoom;
