import * as functions from "firebase-functions";
import { successResponse, errorResponse, defaultRegion } from "../../helpers";
import { AppRequest } from "../../interfaces/Request";
import Hospital from "../../models/hospital";

export const listRS = async (req: AppRequest, res: functions.Response<any>) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.size) || 5;
    const hospitals = await Hospital.find({}, {limit, offset: (page-1)*limit});  

    return successResponse(req, res, {rows: hospitals, page });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const createRS = async (req: AppRequest, res: functions.Response<any>) => {
  try {
    const { body } = req;
    const hospital = await Hospital.create(body);
    console.log(await hospital.get());
    return successResponse(req, res, hospital);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const hospitalController = async (req: AppRequest, res: functions.Response<any>) => {
  switch (req.method) {
    case 'POST':
      createRS(req, res);
      break;
    case 'GET':
      listRS(req, res);
      break;
    default:
      errorResponse(req, res, `Method ${req.method} not allowed`, 403);
      break;
  }
}

export default functions.region(defaultRegion).https.onRequest(hospitalController);