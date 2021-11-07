import * as functions from "firebase-functions";
import { successResponse, errorResponse, defaultRegion } from "../../helpers";
import { AppRequest } from "../../interfaces/Request";
import apiAuth from "../../middleware/apiAuth";
import cors from "../../middleware/cors";
import User from "../../models/user";

export const getProfile = async (req: AppRequest, res: functions.Response<any>) => {
  try {
    return successResponse(req, res, req.user);
  } catch (error) {
    return errorResponse(req, res, "Server Error");
  }
}

export const updateProfile = async (req: AppRequest, res: functions.Response<any>) => {
  try {
    const { body, user } = req;
    const userUpdated = await User.update(user.uid, body);
    return successResponse(req, res, userUpdated);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const profileController = async (req: AppRequest, res: functions.Response<any>) => {
  switch (req.method) {
    case 'GET':
      getProfile(req, res);
      break;
    case 'POST':
      updateProfile(req, res);
      break;
    default:
      errorResponse(req, res, `Method ${req.method} not allowed`, 403);
      break;
  }
}

export default functions.region(defaultRegion).https.onRequest(cors(apiAuth(profileController)));