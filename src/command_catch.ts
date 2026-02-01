import { State } from "./state";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Usage: catch <pokemon-name>`);
    }

    const [pokemonName] = args;
    const pokemon = await state.api.fetchPokemonData(pokemonName);

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const catchChance = Math.floor(Math.random() * 300) + 1;
    if (catchChance > pokemon.base_experience) {
        console.log(`${pokemonName} was caught!`);
        console.log("You may now inspect it with the 'inspect' command");
        state.pokedex[pokemonName] = pokemon;
    } else {
        console.log(`${pokemonName} escaped!`);
    }
}
