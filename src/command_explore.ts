import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Usage: explore <location-name>`);
    }

    const locationAreaName = args[0];
    console.log(`Exploring ${locationAreaName}...`);

    const { pokemon_encounters } =
        await state.api.fetchLocation(locationAreaName);

    if (!pokemon_encounters) {
        console.log("No Pokemon found there...");
        return;
    }

    console.log("Found Pokemon:");
    for (const { pokemon } of pokemon_encounters) {
        console.log(` - ${pokemon.name}`);
    }
    return;
}
