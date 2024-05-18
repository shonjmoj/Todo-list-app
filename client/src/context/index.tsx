import { useFetch } from "@/hooks";
import { TaskProps, UserData } from "@/lib/types";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { globalContext } from "@/lib/contants";

// add login and signup buttons
//  isLoading
//  build backend
// README.md

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    data: user,
    responseStatus,
    setResponseStatus,
    isLoading: userIsLoading,
  } = useFetch<UserData>("/me");
  const [tasks, setTasks] = useState<TaskProps[] | undefined>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== "/signup" &&
      (responseStatus === 401 || !responseStatus)
    ) {
      navigate("/login", { replace: true });
    }
    if (responseStatus === 200) {
      navigate("/", { replace: true });
    }
  }, [responseStatus, navigate, location.pathname]);

  if (userIsLoading) {
    return null;
  }

  return (
    <globalContext.Provider
      value={{ tasks, setTasks, user, navigate, setResponseStatus }}
    >
      {children}
      <Toaster
        toastOptions={{
          style: {
            border: "1px solid #0f172a",
            background: "transparent",
          },
        }}
      />
    </globalContext.Provider>
  );
};
