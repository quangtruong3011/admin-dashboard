import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Add, Search } from "@mui/icons-material";
import TableForm from "../forms/TableForm";
import AdminService from "../services/adminService";
import * as Yup from "yup";
import { tableValidationSchema } from "../validations/table.validation";
import TableLists from "../components/lists/TableList";

const adminService = new AdminService();

const TablePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState(null);
    const [formData, setFormData] = useState({
        tableName: "",
        capacity: "",
    });

    useEffect(() => {
        const fetchTables = async () => {
            try {
                setLoading(true);
                const tables = await adminService.getTables();
                setTables(tables.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setError((prevError) => ({
            ...prevError,
            [name]: null,
        }));
    };

    const handleSubmit = async (event, id) => {
        event.preventDefault();
        try {
            setLoading(true);
            await tableValidationSchema.validate(formData, { abortEarly: false });
            if (id) {
                const table = await adminService.updateTable(id, formData);
                setTables(tables.map((table) => (table.tableId === id ? { ...table, ...formData } : table)));
            } else {
                const table = await adminService.createTable(formData);
                setTables([...tables, table.data.data]);
            }
            setOpen(false);
            setFormData({
                tableName: "",
                capacity: "",
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setError(errors);
            } else {
                setError(error?.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (id) => {
        setTableId(id);
        setOpen(true);
        const fetchTables = async () => {
            try {
                setLoading(true);
                const table = await adminService.getInfoTable(id);
                setFormData(table.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }

    const handleDelete = (id) => {
        try {
            setLoading(true);
            adminService.deleteTable(id);
            setTables(tables.filter((table) => table.tableId !== id));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add table</Button>
                <TextField
                    placeholder="Search table"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <Search />
                            </IconButton>
                        ),
                    }}
                />
            </Box>
            <TableLists
                tables={tables}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
            {tableId ? (
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Table Form</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TableForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                            tableId={tableId}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Table Form</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TableForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </Layout>
    );
};

export default TablePage;