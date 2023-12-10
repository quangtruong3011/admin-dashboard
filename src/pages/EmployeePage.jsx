import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Add, Search } from "@mui/icons-material";
import EmployeeForm from "../forms/EmployeeForm";
import AdminService from "../services/adminService";
import { employeeValidationSchema } from "../validations/employee.validation";
import { DataGrid } from "@mui/x-data-grid";
import * as Yup from "yup";

const adminService = new AdminService();

const EmployeePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        username: "",
        password: "",
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const employees = await adminService.getAllEmployees();
                const employeesWithId = employees.data.data.map((employee) => ({
                    ...employee,
                    id: employee.employeeId,
                }));
                setEmployees(employeesWithId);
            } catch (error) {
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await adminService.deleteEmployee(id);
            setEmployees(employees.filter((employee) => employee.employeeId !== id));
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "fullName", headerName: "Full Name", width: 200 },
        { field: "gender", headerName: "Gender", width: 150 },
        { field: "username", headerName: "Username", width: 150 },
        { field: "password", headerName: "Password", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                >
                    Delete
                </Button>
            ),
        }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setError((prevState) => ({
            ...prevState,
            [name]: null,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            await employeeValidationSchema.validate(formData, { abortEarly: false });
            const response = await adminService.createEmployee(formData);
            const newEmployee = {
                ...response.data.data,
                id: response.data.data.employeeId,
            };
            setEmployees([...employees, newEmployee]);
            setOpen(false);
            setFormData({
                fullName: "",
                gender: "",
                username: "",
                password: "",
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setError(validationErrors);
            } else {
                setError(error.response?.data?.message || "An error occurred");
            }
        } finally {
            setLoading(false);
        };
    }
    return (
        <Layout>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
                    Add Employee
                </Button>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    sx={{ width: 200 }}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <Search />
                            </IconButton>
                        )
                    }}
                />
            </Box>
            <DataGrid
                rows={employees}
                columns={columns}
                pageSize={5}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                autoHeight
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Employee Form</DialogTitle>
                <DialogContent>
                    <EmployeeForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default EmployeePage;