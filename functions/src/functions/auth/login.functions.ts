import * as functions from "firebase-functions";
import { defaultRegion, errorResponse, successResponse } from "../../helpers";
import { AppRequest } from "../../interfaces/Request";
import apiAuth from "../../middleware/apiAuth";
// import compose from "../../middleware/composeMiddleware";

export const login = async (req: AppRequest, res: functions.Response<any>) => {
  try {
    const { user } = req;
    return successResponse(req, res, { user });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, (error as Error).message);
  }
}

export default functions.region(defaultRegion).https.onRequest(
  apiAuth(login)
);