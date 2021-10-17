export const setEmail = (email) => {
    return (dispatch) => {
        dispatch({
            type: "email",
            payload: email
        })
    }
}

export const setPassword = (password) => {
    return (dispatch) => {
        dispatch({
            type: "password",
            payload: password
        })
    }
}