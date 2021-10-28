import * as functions from "firebase-functions";
import { successResponse, errorResponse, defaultRegion } from "../../helpers";
import { AppRequest } from "../../interfaces/Request";
import DonorRequest from "../../models/donor-request";
import apiAuth from "../../middleware/apiAuth";
import cors from "../../middleware/cors";

export const postDonorRequest = async (req: AppRequest, res: functions.Response<any>) => {
  try {
    const { body, user } = req;
    const { uid } = user;
    const donorRequest = await DonorRequest.create({ ...body, uid });
    
    successResponse(req, res, donorRequest);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const getDonorRequest = async (req: AppRequest, res: functions.Response<any>) => {
  const { lat, lng, rsid } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.size) || 5;
  try {
    const query: any = {};
    if (rsid) query.rsid = rsid;
    if (lat) query.lat = lat;
    if (lng) query.lng = lng;
    const donorRequest = await DonorRequest.find(query, {limit, offset: (page-1)*limit});
    console.log(donorRequest)
    successResponse(req, res, donorRequest);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
}

export const donorRequestController = async (req: AppRequest, res: functions.Response<any>) => {
  switch (req.method) {
    case 'POST':
      postDonorRequest(req, res);
      break;
    case 'GET':
      getDonorRequest(req, res);
      break;
    default:
      errorResponse(req, res, `Method ${req.method} not allowed`, 403);
      break;
  }
}

export default functions.region(defaultRegion).https.onRequest(
  cors(apiAuth(donorRequestController))
);