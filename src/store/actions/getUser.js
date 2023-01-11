import axiosInstance from '../../axios config/axiosInstance';

export function GetUser() {

    const token = localStorage.getItem('token')

    console.log(token);
    if (token) {
        console.log(token);

        let config = {
            headers: {
                'Authorization': token
            }
        }
        return (dispatch) => {

            axiosInstance.get(`/users`, config).then((res) => {
                console.log(res.data);

                dispatch({ type: "GET_USER", payload: res.data })

            }).catch((err) => {


            })

        }
    }

}