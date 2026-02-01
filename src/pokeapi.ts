import { Cache } from "./pokecache.js";

const REAP_INTERVAL = 1000; // in milliseconds

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor() {
        this.#cache = new Cache(REAP_INTERVAL);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const fullURL = pageURL || `${PokeAPI.baseURL}/location-area`;

        return (await this.#retrieveOrFetch(fullURL)) as ShallowLocations;
    }

    async fetchLocation(locationAreaName: string): Promise<LocationPokemons> {
        const fullURL = `${PokeAPI.baseURL}/location-area/${locationAreaName}`;

        return (await this.#retrieveOrFetch(fullURL)) as LocationPokemons;
    }

    async fetchPokemonData(pokemonName: string): Promise<Pokemon> {
        const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        return (await this.#retrieveOrFetch(fullURL)) as Pokemon;
    }

    async #retrieveOrFetch(fullURL: string): Promise<unknown> {
        const cachedData = this.#cache.get(fullURL);
        if (cachedData) {
            return cachedData;
        }
        const res = await fetch(fullURL);
        if (res.status === 404) {
            throw new Error("Not found");
        }
        const result = await res.json();
        this.#cache.add(fullURL, result);
        return result;
    }

    stopCache() {
        this.#cache.stopReapLoop();
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type LocationPokemons = {
    id: number;
    name: string;
    pokemon_encounters: {
        pokemon: {
            name: string;
        };
    }[];
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: {
        base_stat: number;
        stat: { name: string };
    }[];
    types: { type: { name: string } }[];
};
