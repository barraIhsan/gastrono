import api from "./axios";

export const uploadImg = async (data: FormData) =>
  (await api.post("/upload", data)).data;
