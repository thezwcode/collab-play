import { useWebSDKSelector } from "../../store/webSDKStore";
import { useEffect, useState } from "react";
import { SearchResults } from "@spotify/web-api-ts-sdk";

const SearchResultsList: React.FC<{ searchStr: string }> = ({ searchStr }) => {
  const sdk = useWebSDKSelector((state) => state.spotify);
  const [results, setResults] = useState<SearchResults<["track", "artist"]>>();
  const handleSongSelection = (songUri: string) => {
    sdk?.player.startResumePlayback("", undefined, [songUri]);
  };
  useEffect(() => {
    (async () => {
      const results = await sdk?.search(searchStr, ["track", "artist"]);
      setResults(() => results);
    })();
  }, [sdk]);
  const resultsDisplay = results?.tracks?.items?.map((item) => {
    return (
      <li
        key={item.id}
        className="border-2"
        onClick={() => handleSongSelection(item.uri)}
      >
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
    <>
      {results && (
        <div className="z-10 border-2">
          {results && <ul>{resultsDisplay}</ul>}
        </div>
      )}
    </>
  );
};

export default SearchResultsList;
