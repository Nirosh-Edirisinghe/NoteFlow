import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(localStorage.getItem("Utoken"))
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false)

  const login = (token) => {
    localStorage.setItem("Utoken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("Utoken");
    setToken(null);
  };

  // fetch my notes
  const fetchNotes = async () => {
    if (!token) return;
    
    try {
      setLoading(true)
      const { data } = await axios.get(backendUrl + '/api/note/my-notes',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setNotes(data.notes);
        console.log('api call succeces');
        
      }

    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const value = {
    token, setToken, login, logout, backendUrl, fetchNotes,notes,loading
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider