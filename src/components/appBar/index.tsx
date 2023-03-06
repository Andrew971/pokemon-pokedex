import Filter from "@components/filter";
import SearchBar from "@components/searchBar";
import { Pokemon } from "pokemon/DB";
import { memo } from "react";

interface AppBarProps {
  onSearch: (searchTerm: string) => void;
  onSelect: (searchTerm: string) => void;
  onClearSelection: () => void;
  filterItems: Pokemon["type"];
  selection: Set<string>;
}
function AppBar({
  onSearch,
  onSelect,
  onClearSelection,
  filterItems,
  selection,
}: AppBarProps) {
  return (
    <header className="flex-col md:flex-row space-x-6 align-middle md:justify-center items-center gap-4 bg-white h-fit md:h-[10vh] flex top-0 left-0 py-4 w-full">
      <SearchBar onSearch={onSearch} />
      <Filter
        onSelect={onSelect}
        onClearSelection={onClearSelection}
        items={filterItems}
        selection={selection}
      />
    </header>
  );
}

export default memo(AppBar);
