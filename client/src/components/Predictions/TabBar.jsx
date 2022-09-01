import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

export default function TabBar({handleFilter, filter}) {
    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginBottom: "15px",
            }}
        >
            <Tabs
                value={filter}
                onChange={handleFilter}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                <Tab label="Open Predictions" />
                <Tab label="Finished Predictions" />
                <Tab label="All Predictions" />
            </Tabs>
        </Box>
    );
}
