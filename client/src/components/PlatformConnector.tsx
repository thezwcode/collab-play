import useToken from "../hooks/useToken";
import Login from "./Login";
import PlatformService from "./PlatformService";

const WebPlayer = () => {
  const { token, getToken } = useToken();
  getToken();

  return <>{token === "" ? <Login /> : <PlatformService token={token} />}</>;
};

export default WebPlayer;
