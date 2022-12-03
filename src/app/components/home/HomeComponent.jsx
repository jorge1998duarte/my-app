import React from "react";

const HomeComponent = () => {
  return (
    <div className="m-auto text-center align-content-between">
      <div className="d-grid gap-2 col-12 mx-auto">
        <label className="form-label">0 / 0</label>
      </div>
      <div className="d-grid gap-2 col-12 mx-auto pb-1">
        <button className="btn btn-outline-dark rounded-4">
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
          limpiar carrito
        </button>
      </div>
    </div>
  );
};

export default HomeComponent;
