// src/services/api.js
const API_BASE = "http://localhost:8000/api"; // nanti tinggal diganti

export const api = {
    get: async (endpoint) => {
        const res = await fetch(`${API_BASE}/${endpoint}`);
        return res.json();
    },

    post: async (endpoint, data) => {
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    put: async (endpoint, data) => {
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    delete: async (endpoint) => {
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: "DELETE",
        });
        return res.json();
    },
};
