import BaseService from "./baseServive.js";

class AuthService extends BaseService {
    login = (data) => {
        return this.http.post("/auth/admin/login", data);
    };

    register = (data) => {
        return this.http.post("/auth/admin/register", data);
    };

    getInfo = () => {
        return this.http.get("/auth/admin/getInfo");
    }
};

export default AuthService;