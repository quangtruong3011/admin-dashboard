import { Add, MoreVert } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Card, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const SelectTableLists = ({ tables, handleSeclectedTable }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [tableId, setTableId] = React.useState(null);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setTableId(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Masonry columns={4} spacing={2}>
            {tables.map((table, index) => (
                <Card key={index}>
                    <CardHeader
                        title={table.tableName}
                        subheader={`Capacity: ${table.capacity} people`}
                        action={
                            <IconButton aria-label="settings" onClick={(event) => handleClick(event, table.tableId)}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <List>
                            {table.info
                                .sort((a, b) => {
                                    const timeA = dayjs(a.bookingTime).format("HH:mm");
                                    const timeB = dayjs(b.bookingTime).format("HH:mm");
                                    return timeA.localeCompare(timeB);
                                })
                                .map((info, index) => (
                                    <ListItem key={index}>
                                        <Typography variant="body1" component="body">
                                            {dayjs(info.bookingDate).format("DD/MM/YYYY")} - {dayjs(info.bookingTime).format("HH:mm")}
                                        </Typography>
                                    </ListItem>
                                ))}
                        </List>
                    </CardContent>
                    {tableId === table.tableId && (
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={() => handleSeclectedTable(table.tableId)}>
                                <ListItemIcon>
                                    <Add />
                                </ListItemIcon>
                                Add
                            </MenuItem>
                        </Menu>
                    )}
                </Card>
            ))}
        </Masonry>
    );
};

export default SelectTableLists;