import api from "./axios";

export const currentUser = async () => {
  return await api.get("/users/me");
};
