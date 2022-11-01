const initState = {
    number: 2
};

const counterReducer = (state = initState, action) => {
    switch (action.type) {

        case 'PLUS_ONE' :
            return { number: state.number + 1 };

        case 'MINUS_ONE' :
            return { number: state.number - 1 };

        default:
            return state;
    }
};

export default counterReducer; 