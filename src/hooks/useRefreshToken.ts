import axios from "@/api/axios";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const useRefreshToken = () => {
  const { setUser } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axios.get("/users/refresh");

    setUser((prev) => {
      console.log(prev);
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
