import { createContext, useState } from 'react'

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState({});

  return (
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      isAdminAuthenticated,
      setIsAdminAuthenticated,
      adminUser,
      setAdminUser
    }}>
      {children}
    </Context.Provider>
  );
};
