import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SearchProps {
  setParPage: (value: number) => void;
  setSearchValue: (value: string) => void;
  searchValue: string;
}

const Search = ({ setParPage, setSearchValue, searchValue }: SearchProps) => {
  const handleParPageChange = (value: string) => {
    setParPage(parseInt(value, 10));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex justify-between items-center">
      <Select onValueChange={handleParPageChange}>
        <SelectTrigger className="px-4 py-2 cursor-pointer bg-[#FDF6EC] border border-slate-700 rounded-md text-[#d0d2d6] w-[120px]">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="text"
        onChange={handleSearchChange}
        value={searchValue}
        placeholder="Search"
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#FDF6EC] border border-slate-700 rounded-md text-white w-60"
      />
    </div>
  );
};

export default Search;
