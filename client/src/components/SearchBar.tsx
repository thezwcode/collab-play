import useDebounce from "../hooks/useDebounce";
import SearchResultsList from "./SearchResultsList";

const SearchBar: React.FC<{ token: string }> = ({ token }) => {
  const [searchStr, setSearchStr] = useDebounce<string>("");

  return (
    <div>
      <label htmlFor="searchStr">
        Search
        <input
          className="ml-2 border-2"
          id="searchStr"
          type="text"
          name="searchStr"
          onChange={(event) => setSearchStr(event.target.value)}
          onKeyDown={(event) =>
            event.key === "enter" ?? setSearchStr(event.currentTarget.value)
          }
        />
      </label>
      {searchStr && <SearchResultsList searchStr={searchStr} token={token} />}
    </div>
  );
};

export default SearchBar;
