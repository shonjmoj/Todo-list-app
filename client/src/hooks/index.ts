import { axiosinstance } from "@/lib/contants";
import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [responseStatus, setResponseStatus] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, status } = await axiosinstance.get(url);
        setData(data);
        setResponseStatus(status);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, setData, responseStatus, setResponseStatus };
};
