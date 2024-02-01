import React, { createContext, useContext, useEffect, useState } from "react";
import "./main.scss";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ProductProv } from "../../context/PtoductContext";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "190px auto",
  borderColor: "aqua",
};

const Main = () => {
  const prod = useContext(ProductProv);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const searchInput = (e) => {
    e.preventDefault();
    const textInput = e.target.value.toLowerCase();
    setInput(textInput);
  };

  const filteredData = prod.product1.filter((el) => {
    if (input === "") {
      return el;
    } else {
      return (
        el.name.toLowerCase().includes(input) ||
        el.brand.toLowerCase().includes(input)
      );
    }
  });

  return (
    <section className="main">
      <div className={prod.product1.length > 0 ? "d100" : "d101"}>
        <div className="d40">
          <div className="d1">
            <p className="p1">Все товары ({prod.products.length})</p>
            <div className="search-inp">
              <input
                type="text"
                placeholder="Поиск..."
                className="input1"
                onChange={searchInput}
              />
              <img src="/image6.svg" alt="" className="img6" />
            </div>
          </div>
          <span className="line"></span>
          <div className="d2">
            <table className="table">
              <thead>
                <tr>
                  <th>Наименование</th>
                  <th>Артикул</th>
                  <th>Бренд</th>
                  <th>Цена</th>
                  <th>Цена со скидкой</th>
                </tr>
              </thead>
              <tbody>
                {/* {loading ? (
                  <ClipLoader
                    color={"blue"}
                    loading={true}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : null} */}
                {prod.product1.length > 0
                  ? filteredData.map((el) => {
                      return (
                        <tr key={el.id}>
                          <td>
                            <NavLink
                              className="link1"
                              to={`/products/${el.id}`}
                            >
                              {el.name}
                            </NavLink>
                          </td>
                          <td>{el.code}</td>
                          <td>{el.brand}</td>
                          <td>{el.price}</td>
                          <td>{el.priceSale}</td>
                          <td className="aaa">
                            <img
                              src="/image7.svg"
                              alt=""
                              onClick={() => prod.editData(el.id)}
                            />
                            <img
                              src="/image8.svg"
                              alt=""
                              onClick={() => prod.deleteData(el.id)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  : null}
                {/* {error ? <h3>{error}</h3> : null} */}
              </tbody>
            </table>
          </div>
          <div className="main-bot">
            <div className="d21">
              <select name="show" id="show" onChange={prod.selectOption}>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
              </select>
              <div className="d20">
                {prod.arrBtns.length > 0
                  ? prod.arrBtns?.map((item) => (
                      <button
                        className="btn2"
                        key={item}
                        onClick={() => setPage(item)}
                      >
                        {item}
                      </button>
                    ))
                  : null}
              </div>
            </div>
            <span className="line2"></span>
          </div>
        </div>
        <div className="d50">
          <div className="d51">
            <div className="d52">
              <button className="add-btn" onClick={prod.changePage}>
                <img src="/image10.svg" alt="" /> Новый товар
              </button>
            </div>
            <div className="d53">
              <img
                src="/image9.svg"
                alt=""
                className={show === false ? "img9" : "img10"}
                onClick={prod.changeLimitInc}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(164, 164, 180, 1)" }}
                className={show === false ? "img10" : "img9"}
                onClick={prod.changeLimitDec}
              >
                <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
              </svg>
            </div>
          </div>
          <div className="d54">
            <p className="p51">© Anymarket 2022</p>
          </div>
        </div>
      </div>
      <div className={prod.product1.length > 0 ? "d103" : "d102"}>
        <p className="p1">Вы пока не создали ни одного товара</p>
        <img src="/image12.png" alt="" className="img12" />
        <button className="first-btn" onClick={prod.changePage}>
          Создать первый товар
        </button>
      </div>
    </section>
  );
};

export default Main;
