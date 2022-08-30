import React from "react";
import { Button, TextField } from "@mui/material";

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
                options: [...state.options, state.option],
                option: "",
            };
        case "optionInput":
            return {
                ...state,
                option: action.payload,
            };
        case "removeOptionInput":
            return {
                ...state,
                options: state.options.filter(
                    (option, index) => option !== action.payload
                ),
            };

        // case "addOptionField":

        //     return {
        //         ...state,
        //         optionField: state.optionField + 1,
        //     };
        case "reset":
            return {
                prediction: "",
                options: [],
                optionField: 0,
            };

        default:
            return state;
    }
};
export default function AddPrediction() {
    const [state, dispatch] = React.useReducer(reducer, {
        prediction: "",
        options: [],
        option: "",
        optionField: 0,
    });

    // const inputs = () => {
    //     let t = 1;
    //     let comp = [];
    //     while (t <= state.optionField) {
    //         comp.push(<TextField label="Option" />);
    //         t++;
    //     }
    //     console.log(comp);
    //     return comp;
    // };
    return (
        <form>
            <TextField
                label="Prediction"
                value={state.prediction}
                onChange={(e) =>
                    dispatch({
                        type: "predictionInput",
                        payload: e.target.value,
                    })
                }
            />

            <TextField
                label="Option"
                value={state.option}
                onChange={(e) =>
                    dispatch({ type: "optionInput", payload: e.target.value })
                }
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    dispatch({
                        type: "addOptionInput",
                    });
                }}
            >
                Add Option
            </Button>
            {state.options.map((option) => (
                <p>{option}</p>
            ))}
        </form>
    );
}
