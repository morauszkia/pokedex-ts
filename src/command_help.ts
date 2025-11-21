import { State } from "./state.js"

export function commandHelp(state: State) {
    console.log(
        `Welcome to the Pokedex!
Usage:
`
    )
    for (const command in state.commands) {
        console.log(`${state.commands[command].name}: ${state.commands[command].description}`)
    }
}