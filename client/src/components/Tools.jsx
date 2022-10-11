import React from "react";
import { Container } from "@mui/material";
import ToolsBar from "./Tools/ToolsBar";
import EightBall from "./Tools/EightBall";

export default function Tools() {
    const [tabNum, setTabNum] = React.useState(0);

    const handleChange = (e, newValue) => {
        setTabNum(newValue);
    };

    const SwitchComponent = () => {


        switch (tabNum) {
            case 0:
                return <EightBall />
        
            default:
                break;
        }



    }

    return (
        <Container>
            <ToolsBar tabNum={tabNum} handleChange={handleChange} />
            <SwitchComponent />
        </Container>
    );
}
