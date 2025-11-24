import { ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandMap(state: State) {
  let locationsData: ShallowLocations;
  if (state.nextLocationURL) {
    locationsData = await state.api.fetchLocations(state.nextLocationURL);
  } else {
    locationsData = await state.api.fetchLocations();
  }
  state.nextLocationURL = locationsData.next;
  state.prevLocationURL = locationsData.previous;
  locationsData.results.forEach((location) => console.log(location.name));
}
