import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthUser = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const UseAuth = () => {
  return useContext(AuthContext);
};
export { UseAuth, AuthUser };
