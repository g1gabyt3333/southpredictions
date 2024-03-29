import React from "react";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    CardActions,
    Chip,
    Divider,
    Box,
    FormControlLabel,
    Switch,
} from "@mui/material";
import * as app from "../../firebase";
import { serverTimestamp } from "firebase/firestore";

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
        case "togglePrivate":
            return {
                ...state,
                private: !state.private,
            };

        case "reset":
            return {
                prediction: "",
                options: [],
                option: "",
            };

        default:
            return state;
    }
};

const PredictionPreview = ({ data }) => {
    const padding = { paddingLeft: "5px", paddingRight: "5px" };
    return (
        <Card sx={{ minWidth: 275, my: "30px" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {data.prediction}
                </Typography>
            </CardContent>
            <CardActions>
                {data.options.map((option, index) => (
                    <Chip
                        key={index}
                        variant={"filled"}
                        label={option}
                        color={"default"}
                        sx={{ ...padding }}
                    />
                ))}
            </CardActions>
        </Card>
    );
};
export default function AddPrediction() {
    const [state, dispatch] = React.useReducer(reducer, {
        prediction: "",
        options: [],
        option: "",
        private: false,
    });

    const handleSubmit = async () => {
        console.log(state);
        const ref = app.db.collection(
            state.private ? "/privatePredictions" : "/predictions"
        );
        let resultsT = {};
        state.options.forEach((option) => {
            if (option === "") {
                return;
            }
            resultsT[option] = 0;
        });
        if (state.options.length < 2 || state.prediction === "") {
            console.log("Error");
            return;
        }
        await ref.add({
            dateCreated: serverTimestamp(),
            isCompleted: false,
            options: state.options,
            prediction: state.prediction,
            results: resultsT,
        });
        dispatch({ type: "reset" });
    };

    return (
        <>
            <Box
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                component="form"
            >
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
                    onChange={(e) => {
                        dispatch({
                            type: "optionInput",
                            payload: e.target.value,
                        });
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            dispatch({
                                type: "addOptionInput",
                            });
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch({
                            type: "addOptionInput",
                        });
                    }}
                    sx={{ minHeight: "56px", maxWidth: "18.5ch" }}
                >
                    Add Option
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    sx={{ minHeight: "56px", maxWidth: "18.5ch" }}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        dispatch({
                            type: "reset",
                        });
                    }}
                    sx={{ minHeight: "56px", maxWidth: "18.5ch" }}
                >
                    Reset
                </Button>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.private}
                            onChange={() => {
                                dispatch({ type: "togglePrivate" });
                            }}
                        />
                    }
                    label="Private?"
                />
            </Box>
            <Divider sx={{ marginTop: "15px", marginBottom: "" }} />
            {state.prediction !== "" ? (
                <PredictionPreview data={{ ...state }} />
            ) : (
                ""
            )}
        </>
    );
}
