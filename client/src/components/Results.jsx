import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LinearProgress } from "@mui/material";

export default function Results(props) {
    return (
        <div>
            <Accordion> 
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>View Results</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <LinearProgress variant="determinate" value={30} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
