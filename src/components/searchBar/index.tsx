import { memo, useCallback, useRef, useState } from "react";
import { Input } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [showIcon, setIconVisibility] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) setIconVisibility(false);
      if (!showIcon && e.target.value.length > 0) setIconVisibility(true);
      onSearch(e.target.value);
    },
    [showIcon, onSearch]
  );

  const onClearHandler = useCallback(
    (_e: React.MouseEvent<SVGSVGElement>) => {
      if (!inputRef.current) return;
      inputRef.current.value = "";
      setIconVisibility(false);
      onSearch("");
    },
    [onSearch]
  );

  return (
    <div className="flex w-72 items-center justify-center">
      <Input
        inputRef={inputRef}
        size="lg"
        label="Search for your favorite Pokemon"
        onChange={onChangeHandler}
        icon={showIcon && <XCircleIcon onClick={onClearHandler} />}
      />
    </div>
  );
}

export default memo(SearchBar);
