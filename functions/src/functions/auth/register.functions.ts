import { auth } from "firebase-admin";
import * as functions from "firebase-functions";
import User from "../../models/user";
import { successResponse, errorResponse, defaultRegion } from "../../helpers";
import cors from "../../middleware/cors";

export const register = async (req: functions.https.Request, res: functions.Response<any>) => {
  try {
    const authResp = await auth().verifyIdToken(req.headers.authorization!);
    const { uid } = authResp;
    const { name, nik, phoneNumber } = req.body;
    console.log({name, nik, phoneNumber});
    await User.create({ uid, name, nik, phoneNumber });
    const user = {uid, name, phoneNumber}
    successResponse(req, res, { user });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export default functions.region(defaultRegion).https.onRequest(cors(register));