import { ResponseError } from "../errors/responseError.js";

export const upload = async (req) => {
  if (!req.file) {
    throw new ResponseError(400, "No file uploaded");
  }

  return {
    filePath: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    size: req.file.size,
  };
};
