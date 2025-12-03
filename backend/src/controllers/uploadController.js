import * as UploadService from "../services/uploadService.js";

export const uploadHandler = async (req, res, next) => {
  try {
    const response = await UploadService.upload(req);

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
