import axios from "axios";

class BaseService {
    baseURL;
    http;

    constructor(baseURL = "http://localhost:8000/api") {
        this.baseURL = baseURL;
        this.http = axios.create({
            baseURL: this.baseURL,
        });
        this.setupInterceptors();
    }

    setupInterceptors() {
        this.http.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token") || "";
                config.headers = {
                    "content-type": "application/json",
                    "x-access-token": token,
                    // "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                    // ...config.headers,
                };
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.http.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    get(url, config = {}) {
        return this.http.get(url, config);
    }

    post(url, data, config = {}) {
        return this.http.post(url, data, config);
    }

    put(url, data, config = {}) {
        return this.http.put(url, data, config);
    }

    delete(url, config = {}) {
        return this.http.delete(url, config);
    }
}

export default BaseService;