import { createContext, useMemo } from "react";
import Axios from "axios";
import useAuth from '../hooks/useAuth';

export const axiosContext = createContext({});

// export const baseURL = "http://localhost:80/api";
export const baseURL = "http://46.101.105.105/api"; 

const AxiosProvider = ({ children }) => {
  const { authState } = useAuth();
  
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    axios.interceptors.request.use((config) => {
      if (authState?.token) {
        config.headers.Authorization = `Bearer ${authState?.token}`;
      }
      return config;
    });

    return axios;
  }, [authState]);
  return (
    <axiosContext.Provider value={axios}>{children}</axiosContext.Provider>
  );
};

export default AxiosProvider;
