import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductProv = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [product1, setProduct1] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(4);
  const [input, setInput] = useState("");
  let numOfpages = Math.ceil(products.length / limit);

  let arrBtns = [];
  for (let i = 1; i <= numOfpages; i++) {
    arrBtns.push(i);
  }

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

  // fetching data
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products?search=${input}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(input);
  }, [input]);

  const fetchPosts = async (page, input) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products?search=${input}&p=${page}&l=${limit}`
      );
      setProduct1(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page, input);
  }, [page, limit, products, input]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Edit products
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
      fetchPosts(page);
      setTimeout(() => {
        navigate("/products");
      }, 10);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products/${id}`
      );
      alert("Are you sure you want to delete");
      fetchData();
      fetchPosts(page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios.post(
        "https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products",
        product
      );
      fetchData();
      fetchPosts(page, input);
      setProduct({
        name: "",
        brand: "",
        code: "",
        description: "",
        price: "",
        priceSale: "",
      });

      setTimeout(() => {
        navigate("/products");
      }, 10);
      toast("you have successfully added a new product");
    } catch (error) {
      console.log(error);
    }
  };

  // reset data
  const resetData = () => {
    alert("Are you sure to reset your data?");
    setProduct({
      name: "",
      brand: "",
      code: "",
      description: "",
      price: "",
      priceSale: "",
    });
    setTimeout(() => {
      navigate("/products");
    }, 10);
  };

  const searchInput = (e) => {
    e.preventDefault();
    const textInput = e.target.value.toLowerCase();
    setInput(textInput);
  };

  const filteredData = product1.filter((el) => {
    if (input === "") {
      return el;
    } else {
      return (
        el.name.toLowerCase().includes(input) ||
        el.brand.toLowerCase().includes(input)
      );
    }
  });

  <ToastContainer />;
  return (
    <ProductProv.Provider
      value={{
        product,
        handleChange,
        handleSubmit,
        editData,
        changePage,
        editSave,
        edit,
        deleteData,
        resetData,
        selectOption,
        changeLimitDec,
        changeLimitInc,
        arrBtns,
        product1,
        products,
        loading,
        error,
        setPage,
        input,
        searchInput,
        filteredData,
      }}
    >
      {children}
    </ProductProv.Provider>
  );
};
export { ProductProvider };
