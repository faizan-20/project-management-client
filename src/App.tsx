import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useAuth from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axiosPrivate.get("/users/get-profile");
        const { firstname, email, avatar, favoriteProjects } =
          response.data.user;
        const accessToken = response.data.accessToken;
        setUser({ email, accessToken, firstname, avatar, favoriteProjects });
      } catch (error) {
        navigate("/login");
        console.error(error);
      }
    };
    getUserProfile();
  }, [setUser, navigate, axiosPrivate]);

  return <Outlet />;
}

export default App;
