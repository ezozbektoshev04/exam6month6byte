import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.scss";
import axios from "axios";

const Details = () => {
  let param = useParams();

  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products/" +
          param.id
      );
      // console.log(res.data);
      setProducts([res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(products);
  return (
    <div className="details">
      {products.length > 0
        ? products.map((el) => {
            return (
              <div key={el.id} className="product-details">
                <img src={el.image} alt="" className="product-img" />
                <h3>{el.name}</h3>
                <p className="p4">{el.brand}</p>
                <div className="d1">
                  <p className="p1">{el.price}</p>
                  <p className="p1">{el.priceSale}</p>
                </div>
                <p className="p2">{el.description}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Details;
