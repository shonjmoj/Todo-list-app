import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/atoms/button";
import Input from "./components/atoms/input";
import "./index.css";
import { userCredentials } from "./lib/types";
import { signup } from "./lib/utils";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials: userCredentials = { username, password };
    const status = await signup(credentials);
    if (status === 201) {
      navigate("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex flex-col gap-3 md:gap-5 items-center p-2 sm:p-4"
    >
      <h1 className="text-3xl sm:text-4xl text-center font-bold">Sign up</h1>
      <Input
        type="text"
        placeholder="username"
        label="Username"
        onChange={handleUsernameChange}
      />
      <Input
        type="password"
        placeholder="password"
        label="Password"
        onChange={handlePasswordChange}
      />
      <Button
        text="Sign up"
        type="submit"
        className="border border-slate-900 bg-slate-900 text-slate-300"
      />
    </form>
  );
}

export default Signup;
