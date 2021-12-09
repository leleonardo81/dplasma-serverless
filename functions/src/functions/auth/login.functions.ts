import * as functions from "firebase-functions";
import { defaultRegion, errorResponse, successResponse } from "../../helpers";
import { AppRequest } from "../../interfaces/Request";
import apiAuth from "../../middleware/apiAuth";
import cors from "../../middleware/cors";

export const login = async (req: AppRequest, res: functions.Response<any>) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { user } = req;
    return successResponse(req, res, { user });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, (error as Error).message);
  }
}

export default functions.region(defaultRegion).https.onRequest(
  cors(apiAuth(login))
);