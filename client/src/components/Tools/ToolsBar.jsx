import React from 'react'
import { Box, Tabs, Tab} from '@mui/material'


export default function ToolsBar({handleChange, tabNum}) {
    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                my: "15px"
            }}
        >
            <Tabs
                value={tabNum}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                <Tab label="Eight Ball" />
            </Tabs>
        </Box>
    );
}
