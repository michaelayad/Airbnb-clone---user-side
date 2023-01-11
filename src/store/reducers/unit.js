var state = {
    title: "",
    description: "",
    catName: null,
    location: { country: "", state: "", city: "" },
    unitType: "",
    placeType: "",
    advantages: [],
    date: { start: null, end: null },
    pricePerNight: null,
    guestsNumber: "",
    host: null,
    hostLang: null,
    bedrooms: "",
    bathrooms: "",
    beds: "",
    images: [],


}

export function unitReducer(State = state, action) {

    if (action.type === 'SET_UNIT') {
        let payload = action.payload
        return { ...State, ...payload }
    } else return State


}
