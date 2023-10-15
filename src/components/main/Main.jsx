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
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");

  const [limit, setLimit] = useState(4);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const changeLimitInc = () => {
    setLimit(2 * limit);
    setShow(!show);
  };
  const changeLimitDec = () => {
    setLimit(limit / 2);
    setShow(!show);
  };
  const selectOption = (e) => {
    if (e.target.value * 1 === 4) {
      setLimit(4);
      console.log(limit);
    } else if (e.target.value * 1 === 6) {
      setLimit(6);
    } else if (e.target.value * 1 === 8) {
      setLimit(8);
    } else if (e.target.value * 1 === 10) {
      setLimit(10);
    } else if (e.target.value * 1 === 12) {
      setLimit(12);
    }
  };
  //   let limit = 4;
  let numOfpages = Math.ceil(products.length / limit);
  let arrBtns = [];
  for (let i = 1; i <= numOfpages; i++) {
    arrBtns.push(i);
  }

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products?p=${page}&l=${limit}`
      );
      setProduct(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page, limit]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products`
      );
      // console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = (id) => {
    try {
      axios.delete(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products/${id}`
      );
      alert("Are you sure you want to delete");
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const searchInput = (e) => {
    e.preventDefault();
    const textInput = e.target.value.toLowerCase();
    setInput(textInput);
  };
  const filteredData = product.filter((el) => {
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
      <div className={product.length > 0 ? "d100" : "d101"}>
        <div className="d40">
          <div className="d1">
            <p className="p1">Все товары ({products.length})</p>
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
                {loading ? (
                  <ClipLoader
                    color={"blue"}
                    loading={true}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : null}
                {product.length > 0
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
                              onClick={() => deleteData(el.id)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  : null}
                {error ? <h3>{error}</h3> : null}
              </tbody>
            </table>
          </div>
          <div className="main-bot">
            <div className="d21">
              <select name="show" id="show" onChange={selectOption}>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="12">12</option>
              </select>
              <div className="d20">
                {arrBtns.length > 0
                  ? arrBtns?.map((item) => (
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
                onClick={changeLimitInc}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(164, 164, 180, 1)" }}
                className={show === false ? "img10" : "img9"}
                onClick={changeLimitDec}
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
      <div className={product.length > 0 ? "d103" : "d102"}>
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
