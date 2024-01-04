import usePlatform from "../hooks/usePlatform";
import SearchBar from "./SearchBar";

const PlatformService: React.FC<{ token: string }> = ({ token }) => {
  const { player } = usePlatform(token);
  return (
    <>
      <div className="flex justify-center">
        <SearchBar token={token} />
      </div>
    </>
  );
};

export default PlatformService;
