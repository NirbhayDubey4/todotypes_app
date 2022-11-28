import React, { FC } from "react";
import { SearchBarProps } from "../types/Custom.types";

const SearchBar: FC<SearchBarProps> = (props) => {
  const { searchQry, setSearchQry } = props;

  return (
    <div>
      <input
        type="text"
        placeholder="search todos.."
        className="p-2 border border-gray-400 outline-none rounded text-lg"
        value={searchQry}
        onChange={(e) => {
          setSearchQry(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
