export function URLReducer(State = 'units?', action) {

    if (action.type === 'GET_URL') {
        return action.payload
    } else return State
}
