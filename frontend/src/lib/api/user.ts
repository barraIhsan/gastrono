import api from "./axios";

export const currentUser = async () => (await api.get("/users/me")).data;
