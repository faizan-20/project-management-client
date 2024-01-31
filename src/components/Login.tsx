import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "@/api/axios";
import { AuthContext, User } from "@/context/AuthProvider";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { setUser } = useContext(AuthContext);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/");
  }, [navigate]);

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<User>(
        "/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const firstname = response?.data?.firstname;
      localStorage.setItem("accessToken", accessToken);
      setUser({ email, firstname, accessToken });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: error?.response?.data?.message,
        });
      } else {
        console.error(error);
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length === 0) {
      setIsValidPassword(true);
    } else if (value.length < 6) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-[0.7] bg-hero-image2 hidden sm:block"></div>
      <div className="flex-1 bg-hero flex justify-center items-center sm:bg-none bg-hero-image2">
        <div className="lg:flex-[0.45] md:flex-[0.7]">
          <div className="text-3xl mb-10">Log In</div>
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="flex flex-col">
              <Label htmlFor="email" className="text-slate-600 pb-1 font-bold">
                Email <span className="text-red-600">*</span>
              </Label>
              <Input
                name="email"
                id="email"
                placeholder="Enter Email"
                type="text"
                className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-5 flex flex-col">
              <Label
                htmlFor="password"
                className="text-slate-600 pb-1 font-bold"
              >
                Password <span className="text-red-600">*</span>
              </Label>
              <Input
                name="password"
                id="password"
                placeholder="Enter Password"
                type="password"
                className={`py-5 px-2 text-md border-2 ${isValidPassword ? "border-slate-400" : "border-red-400"} focus:border-${isValidPassword ? "slate-600" : "red-600"}`}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
              />
              {!isValidPassword && (
                <span className="text-red-500 text-sm">
                  Password should be atleast 6 characters
                </span>
              )}
            </div>
            <Button
              className="my-3 p-5 drop-shadow-md shadow-slate-950"
              disabled={!isValidPassword}
            >
              Log In
            </Button>
          </form>
          <div className="flex flex-col items-center text-gray-600">
            <div className="mt-4 mb-2">
              Don't have an account?{" "}
              <span className="text-blue-700 font-bold">
                <Link to="/register">Sign Up</Link>
              </span>
            </div>
            <div>
              Forgot Password?{" "}
              <span className="text-blue-700 font-bold">Reset Password</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
