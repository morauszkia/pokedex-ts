import { State } from "./state";

export async function commandMapB(state: State) {
  if (state.prevLocationURL) {
    const locations = await state.api.fetchLocations(state.prevLocationURL);
    state.nextLocationURL = locations.next;
    state.prevLocationURL = locations.previous;
    locations.results.forEach((location) => console.log(location.name));
  } else {
    console.log("you're on the first page");
  }
}
