import { createContext, useState } from "react"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(localStorage.getItem("Utoken"))

  const login = (token) => {
    localStorage.setItem("Utoken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("Utoken");
    setToken(null);
  };

  const value = {
    token, setToken, login, logout, backendUrl
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider