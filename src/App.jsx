import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, createContext, lazy } from "react";
// import Sidebar from "./components/sidebar/Sidebar";
// import Header from "./components/header/Header";
const Header = lazy(() => import("./components/header/Header"));
const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));
// import Main from "./components/main/Main";
// import AddToProduct from "./components/addToProduct/AddToProduct";
const AddToProduct = lazy(() =>
  import("./components/addToProduct/AddToProduct")
);
const Main = lazy(() => import("./components/main/Main"));

import { ProductProvider } from "./context/PtoductContext";
// import Details from "./pages/details/Details";
const Details = lazy(() => import("./pages/details/Details"));
const Login = lazy(() => import("./pages/login/Login"));
const Profile = lazy(() => import("./pages/profile/Profile"));
// import Login from "./pages/login/Login";
// import Profile from "./pages/profile/Profile";
import { AuthUser, UseAuth } from "./context/AuthContext";
import RequareAuth from "./components/RequareAuth";
import Loading from "./components/loading/Loading";
export const ProductContext = createContext();

function App() {
  const { user } = UseAuth();
  return (
    <AuthUser>
      <Router>
        <ProductProvider>
          {/* <Login /> */}
          {/* {user && <Header></Header>} */}

          {/* {user && <Sidebar />} */}
          <Suspense fallback={<Loading />}>
            <Sidebar />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Header />
          </Suspense>
          <Routes>
            <Route
              path="/products"
              element={
                <Suspense fallback={<Loading />}>
                  <Main />
                </Suspense>
              }
            />

            <Route
              path="/add"
              element={
                <Suspense fallback={<Loading />}>
                  <AddToProduct />
                </Suspense>
              }
            />
            <Route
              path="/products/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <Details />
                </Suspense>
              }
            ></Route>
            <Route path="/" element={<Login />}></Route>
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loading />}>
                  <RequareAuth>
                    <Profile />
                  </RequareAuth>
                </Suspense>
              }
            ></Route>
          </Routes>
        </ProductProvider>
      </Router>
    </AuthUser>
  );
}

export default App;
