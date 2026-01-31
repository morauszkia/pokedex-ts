import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationURL: string | null;
    prevLocationURL: string | null;
};

export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        rl,
        commands: getCommands(),
        api: new PokeAPI(),
        nextLocationURL: null,
        prevLocationURL: null,
    };
}
