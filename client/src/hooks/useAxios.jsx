import { useContext } from "react";
import { axiosContext } from "../context/AxiosProvider";

const useAxios = () => {
  return useContext(axiosContext);
};

export default useAxios;
