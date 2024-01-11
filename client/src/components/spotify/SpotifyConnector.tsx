import { Scopes } from "@spotify/web-api-ts-sdk";
import { useSpotify } from "../../hooks/useSpotify";
import Login from "../Login";
import { useEffect } from "react";
import { addWebSDK } from "../../store/webSDKStore";
import SpotifySearch from "./SpotifySearch";

const SpotifyConnector = () => {
  const spotifySDK = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    "http://localhost:5173",
    Scopes.userPlayback
  );
  const handleLogin = () => {
    spotifySDK.login(true);
  };
  useEffect(() => {
    if (spotifySDK.sdk) {
      addWebSDK("spotify", { spotify: spotifySDK.sdk });
    }
  }, [spotifySDK.sdk]);
  return (
    <>
      {typeof spotifySDK.sdk === "undefined" ? (
        <Login onTryLogin={handleLogin} />
      ) : (
        <SpotifySearch />
      )}
    </>
  );
};

export default SpotifyConnector;
