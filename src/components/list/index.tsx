import DisplayCard from "@components/displayCard";
import EmptyState from "@components/emptyState";
import { Pokemon } from "pokemon/DB";
import { memo, useDeferredValue } from "react";

interface ListProps {
  items: string[];
  map: Record<string, Pokemon>;
}
function List({ items, map }: ListProps) {
  const deferredList = useDeferredValue(items);
  if (deferredList.length === 0) return <EmptyState />;
  return (
    <div className="grid grid-cols-fluid  gap-10 h-[85vh] overflow-y-auto no-scrollbar justify-items-center">
      {deferredList.map((item) => {
        const data = map[item];
        if (!data) return null;
        return (
          <DisplayCard
            key={data.reference_number}
            name={data.name.english}
            type={data.type}
            reference_number={data.reference_number}
            thumbnailUrl={data.thumbnailUrl}
          />
        );
      })}
    </div>
  );
}

export default memo(List);
