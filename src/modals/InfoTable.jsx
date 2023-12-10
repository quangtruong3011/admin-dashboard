import { Box, List, ListItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const InfoTable = ({ info }) => {
    return (
        <Box>
            <List>
                {info.map((item, index) => (
                    <ListItem key={index}>
                        <Typography variant="h6">
                            {index + 1}.
                        </Typography>
                        <Typography variant="body1">
                            {dayjs(item.bokingDate).format("DD/MM/YYYY")} - {item.bokingDate}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default InfoTable;