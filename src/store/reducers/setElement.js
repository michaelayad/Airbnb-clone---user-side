
// const token = localStorage.getItem('token')
export function eleReducer(State = 0, action) {

    if (action.type === 'SET_ELEMENT') {
        return action.payload
    } else return State


}

