import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../SearchBar";
import SearchResultsList from "./SearchResultsList";

const SpotifySearch = () => {
  const [searchStr, setSearchStr] = useDebounce<string>("");

  const handleSearchStr = (searchStr: string) => {
    setSearchStr(searchStr);
  };
  console.log(searchStr);
  return (
    <div>
      <SearchBar onSearchStrChange={handleSearchStr} />
      {searchStr && <SearchResultsList searchStr={searchStr} />}
    </div>
  );
};

export default SpotifySearch;
