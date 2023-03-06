import List from '@components/list'
import PokemonDB, { pokemonSet, Pokemon, pokemonType } from '../pokemon/DB'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Suspense } from 'react';
import { useSearch } from 'hooks/useSearch';

export async function getServerSideProps(_context: GetServerSidePropsContext) {
  return {
    props: {
      pokemons: pokemonSet,
      pokemonsMap: PokemonDB,
      pokemonType: pokemonType,
    },
  }
}

export default function Home({
  pokemons = [],
  pokemonsMap,
  pokemonType = []
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    onSearch,
    onFilter,
    onClearSelection,
    listItems,
    selection
  } = useSearch<Pokemon>({
    searchDataSet: pokemons,
    searchDataMap: pokemonsMap,
    matcher: (data, set) => {
      const isFound = data.type.filter((type) => set.has(type.english))
      if (isFound.length >= set.size) return true
      return false
    }
  })

  return (<Suspense fallback={<h1>🌀 Loading...</h1>}>
    <div className='flex flex-col h-[100vh] justify-start bg-gray-100' >
      header
      <main className="container mx-auto p-4 h-fit">
        <List 
          items={listItems} 
          map={pokemonsMap} 
        />
      </main>
    </div>
  </Suspense>
  )
}