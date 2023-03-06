import PokemonDB, { pokemonSet, Pokemon, pokemonType } from '../pokemon/DB'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Suspense } from 'react';

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


  return (<Suspense fallback={<h1>🌀 Loading...</h1>}>
    <div className='flex flex-col h-[100vh] justify-start bg-gray-100 text-gray-800' >
      header
      <main className="container mx-auto p-4 h-fit text-gray-800">
      list
      </main>
    </div>
  </Suspense>
  )
}