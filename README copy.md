## Project Pokemon

Raw data found at `https://github.com/fanzeyi/pokemon.json` had to be forked, download and process.

Images have been uploaded into a S3 bucket and made available pubicly at `https://andrew-pokemon.s3.amazonaws.com/`. (e.g : https://andrew-pokemon.s3.amazonaws.com/thumbnails/001.png)

The python script `/src/pokemon/generateDb.py` takes data from `/src/pokemon/pokedex.json` and `/src/pokemon/types.json` to generate a typescript exporting object and type needed for displaying the list of pokemons and the list of types for the filter feature. 

The project consist of :

- 6 UI Components in `src/components`
- 2 React hooks in `src/hooks`
- 2 External utilities in `src/lib` for managing Trie Tree and trie Tree Nodes

## Getting Started

First, 
```bash
git clone
```
Then,
```bash
pnpm install
```
Then,
```bash
pnpm build
```
Finally,
```bash
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
