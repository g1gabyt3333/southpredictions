import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LinearProgress } from "@mui/material";

export default function Results(props) {
    const tot = Object.values(props.results).reduce((a, b) => a + b, 0);
    const keys = Object.keys(props.results);

    const styles = {
        
    }



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
                    {keys.map((key) => (
                        <div key={key}>
                            <LinearProgress
                                variant="determinate"
                                value={Math.floor(
                                    (props.results[key] / tot) * 100
                                )}
                            />
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
