import { memo, useCallback } from "react";
import { Checkbox, Option, Select, Typography } from "@material-tailwind/react";
import { Pokemon } from "pokemon/DB";

interface FilterComponentProps {
  onSelect: (searchTerm: string) => void;
  onClearSelection: () => void;
  items: Pokemon["type"];
  selection: Set<string>;
}

function FilterComponent({
  onSelect,
  onClearSelection,
  items,
  selection,
}: FilterComponentProps) {
  const onChangeHandler = useCallback(
    (e: any) => {
      if (e === "selection:clear") {
        onClearSelection();
        return;
      }
      onSelect(e);
    },
    [onSelect, onClearSelection]
  );
  return (
    <div className="flex items-center justify-center w-fit">
      <Select
        onChange={onChangeHandler}
        className="no-scrollbar"
        size="lg"
        label="Select type"
        value={selection.size > 0 ? [...selection].join(",") : undefined}
        selected={() =>
          selection.size > 0 ? <>{selection.size} selected</> : null
        }
      >
        <Option value={"selection:clear"}>
          <div className="flex flex-row gap-4 items-center justify-center no-scrollbar">
            {/* <XCircleIcon className='h-8 w-8'/> */}
            <Typography
              variant="h5"
              className="block truncate font-normal text-red-700"
            >
              Clear Selection
            </Typography>
          </div>
        </Option>
        {items.map((item) => {
          return (
            <Option key={item.english} value={item.english}>
              <div className="flex flex-row gap-4 items-center justify-start no-scrollbar">
                <Checkbox
                  className="h-5 w-5"
                  checked={selection.has(item.english)}
                  ripple={false}
                  readOnly
                />
                <Typography
                  variant="h5"
                  className={`block truncate ${
                    selection.has(item.english) ? "font-medium" : "font-normal"
                  }`}
                >
                  {item.english}
                </Typography>
              </div>
            </Option>
          );
        })}
      </Select>
    </div>
  );
}

export default memo(FilterComponent);
