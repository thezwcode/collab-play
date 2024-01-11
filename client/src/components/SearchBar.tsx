const SearchBar: React.FC<{
  onSearchStrChange: (searchStr: string) => void;
}> = ({ onSearchStrChange }) => {
  const searchStrHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchStrChange(event.target.value);
  };
  return (
    <>
      <label htmlFor="searchStr">
        Search
        <input
          className="ml-2 border-2"
          id="searchStr"
          type="text"
          name="searchStr"
          onChange={searchStrHandler}
        />
      </label>
    </>
  );
};

export default SearchBar;
