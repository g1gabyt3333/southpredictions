import {Box, Typography} from '@mui/material'



const HeadingGrid = ({ text, bottomText, color, children, noBorder }) => {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "200px",
                maxHeight: "200px",
                alignSelf: "center",
                justifyContent: "center",
                borderRight: {
                    xs: "none",
                    md: noBorder ? "none" : "1px solid #e0e0e0",
                },
                borderBottom: {
                    md: "none",
                    xs: noBorder ? "none" : "1px solid #e0e0e0",
                },
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    alignSelf: "center",
                    padding: "1rem",
                }}
            >
                {text}

                <Typography
                    variant="h6"
                    component="span"
                    sx={{
                        color: color,
                        display: "block",
                    }}
                >
                    {bottomText}
                </Typography>
            </Typography>
            {children}
        </Box>
    );
};

export default HeadingGrid