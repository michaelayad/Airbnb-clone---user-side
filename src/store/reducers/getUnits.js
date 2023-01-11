export function getUnitsReducer(State = [], action) {

    if (action.type === 'GET_UNITS') {
        return action.payload
    } else return State
}
