import Button from "./components/atoms/button";
import Input from "./components/atoms/input";
import "./index.css";

function Login() {
  return (
    <main className="container flex flex-col justify-center gap-3 md:gap-5 items-center p-2 sm:p-4">
      <h1 className="text-3xl sm:text-4xl text-center font-bold">Login</h1>
      <Input type="text" placeholder="username" label="Username" />
      <Input type="password" placeholder="password" label="Password" />
      <Button
        text="Login"
        className="border border-slate-900 bg-slate-900 text-slate-300"
      />
    </main>
  );
}

export default Login;
