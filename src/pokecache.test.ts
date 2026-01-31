import { Cache } from "./pokecache";
import { expect, test } from "vitest";

test.each([
    {
        key: "https://example.com",
        val: "this is some test data",
        interval: 500,
    },
    {
        key: "https://example.com/path",
        val: "this is some more test data",
        interval: 1000,
    },
])("Test PokeCache $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval + 500));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});
