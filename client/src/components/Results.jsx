import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LinearProgress, Box } from "@mui/material";

export default function Results(props) {
    const tot = Object.values(props.results).reduce((a, b) => a + b, 0);
    const keys = Object.keys(props.results);

    const styles = {
        height: 10,
        borderRadius: "5px",
        marginBottom: "15px",
    };

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
                        <Box
                            sx={{ display: "flex", alignItems: "center" }}
                            key={key}
                        >
                            <Box sx={{ minWidth: 100, mb: "15px" }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {key} - {tot === 0 ? "" : Math.floor((props.results[key] / tot) * 100)}%
                                </Typography>
                            </Box>
                            <Box sx={{ width: "100%", mr: 1 }}>
                                <LinearProgress
                                    variant="determinate"
                                    color={key === props.answer ? "secondary" : "primary"}
                                    value={ tot === 0 ? 0 : Math.floor(
                                        (props.results[key] / tot) * 100
                                    )}
                                    sx={{
                                        ...styles,
                                        
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
