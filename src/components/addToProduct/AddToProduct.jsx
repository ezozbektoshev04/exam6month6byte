import React, { useContext, useState } from "react";
import "./add.scss";
import { ProductProv } from "../../context/PtoductContext";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToProduct = () => {
  const navigate = useNavigate();
  const prod = useContext(ProductProv);
  // console.log(prod);

  return (
    <div className="add">
      <div className="d20">
        <button className="btn1">Основные</button>
        <form
          onSubmit={prod.edit === false ? prod.handleSubmit : prod.editSave}
        >
          <div className="field">
            <label htmlFor="name" className="label1">
              Название <span className="sp1">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="input1"
              name="name"
              value={prod.product.name}
              onChange={prod.handleChange}
              required
            />
          </div>
          <div className="field2">
            <div className="d1">
              <label htmlFor="brand" className="label1">
                Бренд <span className="sp1">*</span>
              </label>
              <input
                type="text"
                id="brand"
                className="input2"
                name="brand"
                value={prod.product.brand}
                onChange={prod.handleChange}
                required
              />
            </div>
            <div className="d1">
              <label htmlFor="code" className="label1">
                Артикул производителя <span className="sp1">*</span>
              </label>
              <input
                type="text"
                id="code"
                className="input2"
                name="code"
                value={prod.product.code}
                onChange={prod.handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="description" className="label1">
              Описание <span className="sp1">*</span>
            </label>
            <textarea
              type="text"
              id="description"
              className="note"
              name="description"
              value={prod.product.description}
              onChange={prod.handleChange}
              required
            />
          </div>
          <div className="field2">
            <div className="d1">
              <label htmlFor="price" className="label1">
                Цена
              </label>
              <input
                type="text"
                id="price"
                className="input3"
                name="price"
                value={prod.product.price}
                onChange={prod.handleChange}
              />
            </div>
            <div className="d1">
              <label htmlFor="priceSale" className="label1">
                Цена со скидкой
              </label>
              <input
                type="text"
                id="priceSale"
                className="input3"
                name="priceSale"
                value={prod.product.priceSale}
                onChange={prod.handleChange}
              />
            </div>
          </div>
          <div className="add-bot">
            <button type="submit" className="btn5">
              Сохранить
            </button>

            <button type="reset" className="btn6" onClick={prod.resetData}>
              Отмена
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddToProduct;
