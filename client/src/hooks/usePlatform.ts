import { useEffect, useState } from "react";

const usePlatform = (token: string) => {
  const [player, setPlayer] = useState<Spotify.Player>();
  //TODO refactor to make it easy to integrate other platforms
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    console.log("adding player");

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Collab Play",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect().then((connected) => {
        connected ?? setPlayer(player);
        console.log("player connected");
      });
    };
    return () => {
      console.log("player disconnected");
      player?.disconnect();
    };
  }, []);
  return {
    player: player,
  };
};

export default usePlatform;
