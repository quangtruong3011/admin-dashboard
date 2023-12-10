import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { Card, CardHeader, Grid, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const TableLists = ({ tables, handleUpdate, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [tableId, setTableId] = useState(null);

    const handleClick = (event, tableId) => {
        setAnchorEl(event.currentTarget);
        setTableId(tableId);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container spacing={2}>
            {tables.map((table, index) => (
                <Grid key={index} item xs={3}>
                    <Card sx={{
                        backgroundColor: table.status === "ready" ? "green" : "red",
                        color: "white"
                    }}>
                        <CardHeader
                            action={
                                <IconButton onClick={(event) => handleClick(event, table.tableId)}>
                                    <MoreVert />
                                </IconButton>
                            }
                            title={table.tableName}
                            subheader={`Capacity: ${table.capacity}`}
                        />
                    </Card>
                    {tableId === table.tableId && (
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handleUpdate(table.tableId)}>
                                <ListItemIcon>
                                    <Edit />
                                </ListItemIcon>
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleDelete(table.tableId)}
                            >
                                <ListItemIcon>
                                    <Delete />
                                </ListItemIcon>
                                Delete
                            </MenuItem>
                        </Menu>
                    )}
                </Grid>
            ))
            }
        </Grid >
    );
};

export default TableLists;