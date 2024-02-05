import { useContext, useEffect } from "react";
import Home from "./components/Home";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

function App() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axiosPrivate.get("/users/get-profile");
        const { accessToken, firstname, email, avatar } = response.data.user;
        setUser({ email, accessToken, firstname, avatar });
      } catch (error) {
        localStorage.clear();
        navigate("/login");
        console.error(error);
      }
    };
    getUserProfile();
  }, [setUser, navigate, axiosPrivate]);

  return <Home />;
}

export default App;
