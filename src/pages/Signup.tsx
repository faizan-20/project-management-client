import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext, User } from "@/context/AuthProvider";
import { useToast } from "../components/ui/use-toast";
import axios from "@/api/axios";
import { isAxiosError } from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { setUser } = useContext(AuthContext);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/");
  }, [navigate]);

  const handlePasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value.length === 0) {
      setPasswordsMatch(true);
    } else if (password !== value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleValidPassword = (value: string) => {
    setPassword(value);
    if (value.length === 0) {
      setIsValidPassword(true);
    } else if (value.length < 6) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<User>(
        "/users/signup",
        {
          firstname: firstName,
          lastname: lastName,
          email,
          password1: password,
          password2: confirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const firstname = response?.data?.firstname;
      localStorage.setItem("accessToken", accessToken);
      setUser({ email, firstname, accessToken });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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

  return (
    <div className="flex h-screen">
      <div className="flex-[0.7] bg-hero-image2 hidden sm:block"></div>
      <div className="flex-1 bg-hero flex justify-center items-center sm:bg-none bg-hero-image2">
        <div className="lg:flex-[0.45] md:flex-[0.7]">
          <div className="text-3xl mb-10">Sign Up</div>
          <form className="flex flex-col gap-2" onSubmit={submitHandler}>
            <div className="gap-2 flex md:flex-row flex-col">
              <div>
                <Label htmlFor="firstname" className="text-slate-600 font-bold">
                  First Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  name="firtname"
                  id="firstname"
                  placeholder="Enter FirstName"
                  type="text"
                  className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastname" className="text-slate-600 font-bold">
                  Last Name
                </Label>
                <Input
                  name="lastname"
                  id="lastname"
                  placeholder="Enter LastName"
                  type="text"
                  className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email" className="text-slate-600 font-bold">
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
            <div className="flex flex-col">
              <Label htmlFor="password1" className="text-slate-600 font-bold">
                Password <span className="text-red-600">*</span>
              </Label>
              <Input
                name="password1"
                id="password1"
                placeholder="Enter Password"
                type="password"
                className={`py-5 px-2 text-md border-2 ${isValidPassword ? "border-slate-400" : "border-red-400"} focus:border-${isValidPassword ? "slate-600" : "red-600"}`}
                value={password}
                onChange={(e) => handleValidPassword(e.target.value)}
                required
              />
              {!isValidPassword && (
                <span className="text-red-500 text-sm">
                  Password should be atleast 6 characters
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="password2" className="text-slate-600 font-bold">
                Confirm Password <span className="text-red-600">*</span>
              </Label>
              <Input
                name="password2"
                id="password2"
                placeholder="Enter Password"
                type="password"
                className={`py-5 px-2 text-md border-2 ${passwordsMatch ? "border-slate-400" : "border-red-400"} focus:border-${passwordsMatch ? "slate-600" : "red-600"}`}
                value={confirmPassword}
                onChange={(e) => {
                  handlePasswordChange(e.target.value);
                }}
                required
              />
              {!passwordsMatch && (
                <span className="text-red-500 text-sm">
                  Passwords do not match
                </span>
              )}
            </div>
            <Button
              className="my-3 p-5 drop-shadow-md shadow-slate-950"
              disabled={!isValidPassword || !passwordsMatch}
            >
              Sign Up
            </Button>
          </form>
          <div className="flex flex-col items-center text-gray-600">
            <div className="mt-4 mb-2">
              Already have an account?{" "}
              <span className="text-blue-700 font-bold">
                <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
