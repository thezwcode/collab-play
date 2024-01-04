import { useCallback, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState("");

  const getToken = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/token`);
    const json = await response.json();
    if (json.access_token) {
      console.log("setting token");
      setToken(json.access_token);
    }
  }, []);

  return {
    token: token,
    getToken: getToken,
  };
};

export default useToken;
