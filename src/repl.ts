import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(/\s+/).map(word => word.trim()).filter(word => word !== "");
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    })

    function evaluateInput(input: string) {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        const commandStr = words[0];
        const commands = getCommands();
        const command = commands[commandStr];

        if (!command) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }

        try {
            command.callback(commands);
        } catch (error) {
            console.log(error)
        }

        rl.prompt();
    }

    rl.prompt();
    rl.on("line", (input) => evaluateInput(input))
}
