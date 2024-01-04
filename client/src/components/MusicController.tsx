import MusicPlayer from "./MusicPlayer";
import Playlist from "./Playlist";

const MusicController = () => {
  return (
    <div className="flex flex-col">
      <MusicPlayer />
      <Playlist />
    </div>
  );
};

export default MusicController;
