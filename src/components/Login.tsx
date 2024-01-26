import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                Email
              </Label>
              <Input
                name="email"
                id="email"
                placeholder="Enter Email"
                type="text"
                className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-5 flex flex-col">
              <Label
                htmlFor="password"
                className="text-slate-600 pb-1 font-bold"
              >
                Password
              </Label>
              <Input
                name="password"
                id="password"
                placeholder="Enter Password"
                type="password"
                className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="my-3 p-5 drop-shadow-md shadow-slate-950">
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
