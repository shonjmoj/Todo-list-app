import { useContext, useState } from "react";
import Button from "./components/atoms/button";
import Input from "./components/atoms/input";

import "./index.css";
import { userCredentials } from "./lib/types";
import { login } from "./lib/utils";
import { globalContext } from "./lib/contants";

function Login() {
  const { setResponseStatus } = useContext(globalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nothingToSubmit = !username || !password;

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
    setResponseStatus(status);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-center gap-3 md:gap-5 p-2 sm:p-4 h-full"
    >
      <h1 className="text-3xl sm:text-4xl xl:text-5xl text-center font-bold">
        Login
      </h1>
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
        disabled={nothingToSubmit}
        text="Login"
        type="submit"
        className="border border-slate-900 bg-slate-900 text-slate-300"
      />
      <span className="text-sm lg:text-base self-center">
        New here?{" "}
        <a href="/signup" className="underline">
          Sign up
        </a>
      </span>
    </form>
  );
}

export default Login;
