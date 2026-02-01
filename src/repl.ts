import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .map((word) => word.trim())
        .filter((word) => word !== "");
}

export async function startREPL(state: State) {
    const { rl, commands } = state;
    async function evaluateInput(input: string) {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        const commandStr = words[0];
        const command = commands[commandStr];

        if (!command) {
            console.log(
                "Unknown command! Type 'help' to list available commands.",
            );
            rl.prompt();
            return;
        }

        try {
            await command.callback(state, ...words.slice(1));
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }

        rl.prompt();
    }

    rl.prompt();
    rl.on("line", async (input) => await evaluateInput(input));
}
