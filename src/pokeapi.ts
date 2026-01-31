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

        const cachedLocationData = this.#cache.get(fullURL);
        if (cachedLocationData) {
            return cachedLocationData as ShallowLocations;
        }

        const res = await fetch(fullURL);
        const locationData = (await res.json()) as ShallowLocations;
        this.#cache.add(fullURL, locationData);
        return locationData;
    }

    async fetchLocation(locationAreaName: string): Promise<LocationPokemons> {
        const fullURL = `${PokeAPI.baseURL}/location-area/${locationAreaName}`;

        const cachedPokemonData = this.#cache.get(fullURL);
        if (cachedPokemonData) {
            return cachedPokemonData as LocationPokemons;
        }

        const res = await fetch(fullURL);
        const locationPokemons = (await res.json()) as LocationPokemons;
        this.#cache.add(fullURL, locationPokemons);
        return locationPokemons;
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
