import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useAuth from "./hooks/useAuth";
import { ProjectsContext } from "./context/ProjectsProvider";

function App() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setFavProjects } = useContext(ProjectsContext);
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
  }, [setUser, navigate, axiosPrivate, setFavProjects]);

  useEffect(() => {
    const getFavProjects = async () => {
      try {
        const { data } = await axiosPrivate.get(
          "/projects/get-all-fav-projects"
        );
        setFavProjects(data.favoriteProjects);
      } catch (error) {
        console.error(error);
      }
    };

    getFavProjects();
  }, [axiosPrivate, setFavProjects]);

  return <Outlet />;
}

export default App;
