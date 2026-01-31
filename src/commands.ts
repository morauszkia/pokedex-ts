import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Lists available commands",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Lists next 20 location areas in the Pokemon world",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description:
                "Lists previous 20 location areas in the Pokemon world",
            callback: commandMapB,
        },
        explore: {
            name: "explore",
            description: "Look for Pokemons in a location area",
            callback: commandExplore,
        },
    };
}
