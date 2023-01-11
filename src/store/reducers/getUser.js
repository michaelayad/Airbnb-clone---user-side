export function getUserReducer(State = null, action) {

    if (action.type === 'GET_USER') {
        return action.payload
    } else return State
}
