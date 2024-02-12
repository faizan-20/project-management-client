import axios from "@/api/axios";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const useRefreshToken = () => {
  const { setUser } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axios.get("/users/refresh", {
      withCredentials: true,
    });

    setUser((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
