const reducer = (state = "", action) => {
    switch (action.type) {
        case "password":
            return state + action.payload;
        default:
            return state;
    }
};

export default reducer;