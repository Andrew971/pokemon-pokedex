import { useState, useEffect, useCallback } from 'react';
import { TrieTree } from '../utils/trietree';

interface AppState {
  searchTree: TrieTree;
  searchDataSet?: boolean;
}

export function useTrieTree(searchTerm: string, dataset: string[] = []): [string[], (newDataSet: string[]) => void] {
  const [data, setData] = useState<string[]>(dataset);
  const [search, setSearch] = useState<AppState>({
    searchTree: new TrieTree(),
    searchDataSet: false,
  });
  const { searchTree, searchDataSet } = search;
  
  useEffect(() => {
    if (!searchDataSet && dataset.length > 0) {
      setSearch({
        searchTree: new TrieTree(dataset),
        searchDataSet: true,
      });
    }
  }, [dataset, searchDataSet]);

  const updateDataSet = useCallback((newDataSet: string[]) => {
    setData(newDataSet)
    setSearch({
      searchTree: new TrieTree(newDataSet),
      searchDataSet: true,
    });
  }, [])

  if (searchTerm.length > 0) {
    return [searchTree.complete(searchTerm), updateDataSet];
  }
  
  return [data, updateDataSet];
}