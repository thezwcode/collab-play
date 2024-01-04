import { useQuery } from "@tanstack/react-query";
import getSearchResults from "../api/getSearchResults";

const SearchResultsList: React.FC<{ searchStr: string; token: string }> = ({
  searchStr,
  token,
}) => {
  const query = useQuery({
    queryKey: ["searchBar", { searchStr, token }],
    queryFn: () => getSearchResults({ searchStr, token }),
  });
  const searchResponse = query.data;
  const resultsDisplay = searchResponse?.tracks?.items?.map((item) => {
    return (
      <li className="border-2">
        <div>{item.name}</div>
        <div>
          {item.artists.map((artist) => {
            return <div>{artist.name}</div>;
          })}
        </div>
      </li>
    );
  });

  return (
    <div className="z-10 border-2">
      {searchResponse && <ul>{resultsDisplay}</ul>}
    </div>
  );
};

export default SearchResultsList;
