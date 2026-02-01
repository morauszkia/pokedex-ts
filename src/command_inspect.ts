import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Usage: inspect <pokemon-name>");
    }

    const [pokemonName] = args;
    const pokemon = state.pokedex[pokemonName];

    if (!pokemon) {
        throw new Error(`Pokemon ${pokemonName} is not in your Pokedex!`);
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const { type } of pokemon.types) {
        console.log(`  - ${type.name}`);
    }
}
