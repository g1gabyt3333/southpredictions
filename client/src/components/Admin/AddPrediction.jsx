import React from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "predictionInput":
            return {
                ...state,
                prediction: action.payload,
            };
        case "addOptionInput":
            return {
                ...state,
                options: [...state.options, action.payload],
            };
        case "removeOptionInput":
            return {
                ...state,
                options: state.options.filter(
                    (option, index) => index !== action.payload
                ),
            };
        case "reset":
            return {
                prediction: "",
                options: [],
            };
        default:
            return state;
    }
};
export default function AddPrediction() {
    const [state, dispatch] = React.useReducer(reducer, {
        prediction: "",
        options: [],
    });
    return <div>AddPrediction</div>;
}
