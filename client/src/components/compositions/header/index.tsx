import Button from "@/components/atoms/button";
import { useFetch } from "@/hooks";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { globalContext } from "@/lib/contants";

const Header = () => {
  const { setResponseStatus } = useContext(globalContext);
  const { data: user } = useFetch<{ username: string }>("/me");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = Cookies.get("token") as string;
    if (token) {
      Cookies.remove("token");
      setResponseStatus(undefined);
    }
    navigate("/login");
  };

  return (
    <header className="container w-full p-2 md:p-4 fixed top-0 flex justify-between lg:justify-around">
      <h1 className="text-3xl sm:text-4xl text-center font-bold">
        {user?.username}
      </h1>
      <Button
        text="Log out"
        className="border border-red-600 bg-red-600 text-gray-300"
        onClick={handleLogout}
      />
    </header>
  );
};

export default Header;
