import { useState, useCallback, useTransition } from 'react';
import { useTrieTree } from 'hooks/useTrieTree';

interface SearchProps<T extends unknown>{
  searchDataSet: string[];
  searchDataMap: Record<string, T>;
  matcher: (data: T, set:Set<String>) => boolean
}

export function useSearch<T>({ searchDataSet, searchDataMap, matcher }: SearchProps<T>) {
  const [isPending, startTransition] = useTransition();
  const [selection, setSelection] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('');
  const [listItems, setData] = useTrieTree(searchTerm, searchDataSet);

  const updateDataSet = useCallback((set: Set<string>) => {
    setData(set.size === 0
      ? searchDataSet
      : searchDataSet.filter((item: string) => {
        const data = searchDataMap[item]
        if (!data) return false
        return matcher(data, set)
      }))
  }, [searchDataSet, searchDataMap, setData, matcher])

  const onFilterHandler = useCallback((selected: string) => {
    startTransition(() => {
      if (selection.has(selected)) {
        selection.delete(selected)
        const newSet = new Set([...selection])
        setSelection(newSet)
        updateDataSet(newSet)
      } else {
        selection.add(selected)
        const newSet = new Set([...selection])
        setSelection(newSet)
        updateDataSet(newSet)
      }
    })
  }, [selection, updateDataSet])

  const onSearchHandler = useCallback((searchTerm: string) => {
    startTransition(() => {
      setSearchTerm(searchTerm.toLowerCase())
    })
  }, [])

  const onClearSelectionHandler = useCallback(() => {
    startTransition(() => {
      const newSet = new Set([])
      setSelection(newSet)
      updateDataSet(newSet)
    })
  }, [updateDataSet])

  return {
    onSearch: onSearchHandler,
    onFilter: onFilterHandler,
    onClearSelection: onClearSelectionHandler,
    listItems: listItems,
    selection: selection,
    isPending: isPending
  }
}