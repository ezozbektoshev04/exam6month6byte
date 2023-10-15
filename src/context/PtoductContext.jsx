import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductProv = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    code: "",
    description: "",
    price: "",
    priceSale: "",
  });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const editData = (id) => {
    const aa = products.filter((el) => {
      if (el.id === id) {
        setProduct({
          id: el.id,
          name: el.name,
          brand: el.brand,
          code: el.code,
          description: el.description,
          price: el.price,
          priceSale: el.priceSale,
        });
      }
      setEdit(true);
    });

    navigate("/add");
  };
  //   console.log(product);
  //   const saveData = () => {
  //     if (edit === false) {
  //       handleSubmit();
  //     } else {
  //       editSave();
  //     }
  //   };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const changePage = () => {
    navigate("/add");
    setProduct({
      name: "",
      brand: "",
      code: "",
      description: "",
      price: "",
      priceSale: "",
    });
    setEdit(false);
  };
  const editSave = (event) => {
    // e.preventDefault();
    event.preventDefault();
    toast("you have successfully edited product");
    try {
      axios.put(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products/${product.id}`,
        product
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(editSave());
  //   editSave;

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products"
      );
      // console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("you have successfully added a new product");
    try {
      axios.post(
        "https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products",
        product
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  <ToastContainer />;
  return (
    <ProductProv.Provider
      value={{
        product,
        handleChange,
        handleSubmit,
        products,
        editData,
        changePage,
        editSave,
        edit,
      }}
    >
      {children}
    </ProductProv.Provider>
  );
};
export { ProductProvider };
