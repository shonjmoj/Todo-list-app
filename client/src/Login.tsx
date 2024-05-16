import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/atoms/button";
import Input from "./components/atoms/input";
import "./index.css";
import { userCredentials } from "./lib/types";
import { login } from "./lib/utils";

function Login() {
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
    const status = await login(credentials);
    if (status === 200) {
      navigate("/");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container flex flex-col justify-center gap-3 md:gap-5 items-center p-2 sm:p-4"
    >
      <h1 className="text-3xl sm:text-4xl text-center font-bold">Login</h1>
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
        text="Login"
        type="submit"
        className="border border-slate-900 bg-slate-900 text-slate-300"
      />
    </form>
  );
}

export default Login;
