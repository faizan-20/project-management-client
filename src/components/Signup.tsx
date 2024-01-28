import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (password !== value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen">
      <div className="flex-[0.7] bg-hero-image2 hidden sm:block"></div>
      <div className="flex-1 bg-hero flex justify-center items-center sm:bg-none bg-hero-image2">
        <div className="lg:flex-[0.45] md:flex-[0.7]">
          <div className="text-3xl mb-10">Sign Up</div>
          <form className="flex flex-col" onSubmit={submitHandler}>
          <div className = "my-5 flex flex-row">
          <div className="mr-2">
              <Label htmlFor="firstname" className="text-slate-600 pb-1 font-bold">
                First Name
              </Label>
              <Input
                name="firtname"
                id="firstname"
                placeholder="Enter FirstName"
                type="text"
                className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="ml-2">
              <Label htmlFor="lastname" className="text-slate-600 pb-1 font-bold">
                Last Name
              </Label>
              <Input
                name="lastname"
                id="lastname"
                placeholder="Enter LastName"
                type="text"
                className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
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
                htmlFor="password1"
                className="text-slate-600 pb-1 font-bold"
              >
                Password
              </Label>
              <Input
                name="password1"
                id="password1"
                placeholder="Enter Password"
                type="password"
                className="py-5 px-2 text-md border-slate-400 border-2 focus:border-slate-600"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-5 flex flex-col">
              <Label
                htmlFor="password2"
                className="text-slate-600 pb-1 font-bold"
              >
                Confirm Password
              </Label>
              <Input
                name="password2"
                id="password2"
                placeholder="Enter Password"
                type="password"
                className={`py-5 px-2 text-md border-2 ${passwordsMatch ? 'border-slate-400' : 'border-red-400'} focus:border-${passwordsMatch ? 'slate-600' : 'red-600'}`}
                onChange={(e) => {
                  handlePasswordChange(e.target.value);
                }}
              />
              {!passwordsMatch && (
                <span className="text-red-500 text-sm">Passwords do not match</span>
              )}
            </div>
            <Button className="my-3 p-5 drop-shadow-md shadow-slate-950">
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
