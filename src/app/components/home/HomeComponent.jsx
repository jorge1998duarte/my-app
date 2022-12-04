import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  agregarProducto,
  buscarProducto,
  quitarProducto,
} from "../../../services/Services";
import ListProducts from "../products/ListProducts";
import FittingRoom from "../shopping/FittingRoom";

const HomeComponent = () => {
  const [products, setProducts] = useState([]);
  const [showFittingRoom, setShowFittingRoom] = useState(false);

  useEffect(() => {
    return () => {};
  }, [products]);

  const handleSearch = () => {
    Swal.fire({
      title: "<h4>Buscar Producto</h4>",
      input: "text",
      inputValue: "122285100600",
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
          confirmButtonColor: "#000000",
        });
      }
    });
  };

  const handleSend = () => {
    if (products.length > 0) {
      Swal.fire({
        html: `<h4>¿Esta seguro de enviar a carrito los productos?</h4>`,
        confirmButtonText: "Si",
        showCancelButton: true,
        confirmButtonColor: "#000000",
        cancelButtonText: "No",
        cancelButtonColor: "#000000",
      }).then(async (response) => {
        if (response.isConfirmed) {
          if (
            products.filter(
              (producto) => typeof producto?.talla !== "undefined"
            ).length > 0
          ) {
            const id = sessionStorage.getItem("id");
            setProducts(
              products.map((producto) => {
                const registro = {
                  sku: producto.sku,
                  Idproducto: producto.idProducto,
                  Idtalla: producto.idTalla,
                  Idregistro: id,
                };

                if (!producto?.send && typeof producto?.talla !== "undefined") {
                  agregarProducto(registro)
                    .then((response) => {
                      if (response.status === 200) {
                        Swal.fire({
                          title: "<h4>Registro de Producto</h4>",
                          html: `<h4>El Producto con el ID: ${producto.idProducto}</h4>`,
                          icon: "success",
                          showConfirmButton: false,
                          timer: 2000,
                        });

                        producto.send = true;
                      }
                    })
                    .catch((error) => {
                      Swal.fire({
                        title: "<h4>Error</h4>",
                        html: `<h4>El Producto con el ID: ${producto.idProducto}, ${error.response.data}</h4>`,
                        icon: "error",
                        timer: 2000,
                      });

                      producto.send = true;
                    });
                }

                return producto;
              })
            );
          } else {
            Swal.fire({
              title: "<h4>No hay Productos</h4>",
              html: `<h4>No hay productos con talla seleccionada para agregar al carrito</h4>`,
              icon: "info",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      });
    } else {
      Swal.fire({
        title: "<h4>No hay Productos</h4>",
        html: `<h4>La lista de productos se encuentra vacia</h4>`,
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleCleanFittingRoom = () => {
    Swal.fire({
      title: `<h4>¿Seguro de que desea vaciar el carrito?</h4>`,
      confirmButtonText: "Si",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonText: "No",
      cancelButtonColor: "#000000",
    }).then(async (response) => {
      if (response.isConfirmed) {
        const id = sessionStorage.getItem("id");
        setProducts(
          products.map((producto) => {
            if (producto.send) {
              quitarProducto({
                Idregistro: id,
                Idproducto: producto.idProducto,
              }).then(async (response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "<h4>Prenda eliminada</h4>",
                    html: `La prenda con el ID:${producto.idProducto} ha sido eliminada del carrito.`,
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  producto.send = !producto.send;
                }
              });
            }
            return producto;
          })
        );
        setTimeout(() => {
          handleShow();
        }, 2000);
      }
    });
  };

  const handleShow = () => {
    setShowFittingRoom(!showFittingRoom);
  };

  return (
    <div className="m-auto text-center">
      <div className="d-grid gap-2 col-12 mx-auto">
        {!showFittingRoom ? (
          <ListProducts products={products} setProducts={setProducts} />
        ) : (
          <FittingRoom products={products} setProducts={setProducts} />
        )}
      </div>
      <div className="d-grid gap-2 col-12 mx-auto w-75 pb-1">
        {!showFittingRoom ? (
          <button
            className="btn btn-outline-dark rounded-4"
            onClick={handleSearch}
          >
            Escanea tus productos
          </button>
        ) : (
          <button
            className="btn btn-outline-dark rounded-4"
            onClick={handleShow}
          >
            Regresar escanear SKU
          </button>
        )}
      </div>
      <div className="d-grid gap-2 col-12 mx-auto w-75 pb-1">
        {!showFittingRoom && (
          <button
            className="btn btn-outline-dark rounded-4"
            onClick={handleSend}
          >
            Enviar a Carrito
          </button>
        )}
      </div>
      <div className="d-grid gap-2 col-12 w-75 mx-auto pb-1">
        {!showFittingRoom && (
          <button
            className="btn btn-outline-dark rounded-4"
            onClick={handleShow}
          >
            Ir a probador
          </button>
        )}
      </div>
      <div className="d-grid gap-2 col-12 mx-auto w-75 pb-1">
        {showFittingRoom && (
          <button
            className="btn btn-outline-dark rounded-4"
            onClick={handleCleanFittingRoom}
          >
            Limpiar carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
