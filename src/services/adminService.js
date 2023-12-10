import BaseService from "./baseServive";

class AdminService extends BaseService {
    // CREATE
    createRestaurant = (data) => {
        return this.post("/admin/restaurant", data);
    };

    createEmployee = (data) => {
        return this.post("/admin/employee", data);
    };

    createPost = (data) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return this.post("/admin/post", data, config);
    };

    createProduct = (data) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return this.post("/admin/menu", data, config);
    };

    getProductCategory = (data) => {
        return this.post("/admin/menu/category", data);
    };

    createBooking = (data) => {
        return this.post("/admin/booking", data);
    };

    getBooking = (data) => {
        return this.post("/admin/findBooking", data);
    };

    createTable = (data) => {
        return this.post("/admin/table", data);
    };

    // READ
    getInfo = () => {
        return this.get("/admin/info");
    };

    getRestaurant = () => {
        return this.get("/admin/restaurant");
    };

    getInfoRestaurant = (id) => {
        return this.get(`/admin/restaurant/${id}`);
    };

    getAllBookings = () => {
        return this.get("/admin/booking");
    };

    getInfoBooking = (id) => {
        return this.get(`/admin/booking/${id}`);
    };

    getAllEmployees = () => {
        return this.get("/admin/employee");
    };

    getInfoProduct = (id) => {
        return this.get(`/admin/menu/${id}`);
    };

    getAllProducts = () => {
        return this.get("/admin/menu");
    };

    getAllPosts = () => {
        return this.get("/admin/post");
    };

    getInfoPost = (id) => {
        return this.get(`/admin/post/${id}`);
    };

    getTotals = () => {
        return this.get("/admin/totals");
    };

    getTables = () => {
        return this.get("/admin/table");
    };

    getInfoTable = (id) => {
        return this.get(`/admin/table/${id}`);
    };

    getTablesReady = () => {
        return this.get("/admin/tableReady");
    };

    // UPDATE
    updateRestaurant = (data) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return this.put("/admin/restaurant", data, config);
    };

    updateProduct = (id, data) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return this.put(`/admin/menu/${id}`, data, config);
    };

    checkInBooking = (id) => {
        return this.put(`/admin/booking/checkIn/${id}`);
    };

    updateTableForBooking = (id, data) => {
        return this.put(`/admin/booking/table/${id}`, data);
    };

    updateMenuForBooking = (id, data) => {
        return this.put(`/admin/booking/order/${id}`, data);
    };

    payBooking = (id, data) => {
        return this.put(`/admin/booking/pay/${id}`, data);
    };

    updateTable = (id, data) => {
        return this.put(`/admin/table/${id}`, data);
    };

    updatePost = (id, data) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return this.put(`/admin/post/${id}`, data, config);
    };

    updateAvatar = (data) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return this.put(`/admin/profile/avatar`, data, config);
    };

    updateCover = (data) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return this.put(`/admin/profile/cover`, data, config);
    };

    // DELETE
    deleteRestaurant = (id) => {
        return this.delete(`/admin/restaurant/${id}`);
    };

    deleteProduct = (id) => {
        return this.delete(`/admin/menu/${id}`);
    };

    deleteEmployee = (id) => {
        return this.delete(`/admin/employee/${id}`);
    };

    deletePost = (id) => {
        return this.delete(`/admin/post/${id}`);
    };

    deleteBooking = (id) => {
        return this.delete(`/admin/booking/${id}`);
    };

    deleteTable = (id) => {
        return this.delete(`/admin/table/${id}`);
    };
}

export default AdminService;