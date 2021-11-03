import * as functions from "firebase-functions";
import { successResponse, errorResponse, defaultRegion } from "../../helpers";
import { AppRequest } from "../../interfaces/Request";
import DonorRequest from "../../models/donor-request";
import apiAuth from "../../middleware/apiAuth";
import cors from "../../middleware/cors";
import Hospital from "../../models/hospital";
import User from "../../models/user";

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

export const getDetailDonorRequest = async (req: AppRequest, res: functions.Response<any>) => {
  const id: string = req.params[0];
  try {
    const donorRequest = await DonorRequest.findById(id);
    const queryUser = await User.find({ uid: donorRequest.uid });
    const user = queryUser.docs[0]?.data();
    delete donorRequest.uid;
    const hospital = await Hospital.findById(donorRequest.rsid);
    delete donorRequest.rsid;
    successResponse(req, res, {...donorRequest, hospital, user});
  } catch (error) {
    console.error(error)
    return errorResponse(req, res, "cannot Find", 404);
  }
}

export const donorRequestController = async (req: AppRequest, res: functions.Response<any>) => {
  const id: string = req.params[0].substr(1);
  switch (req.method) {
    case 'POST':
      apiAuth(postDonorRequest)(req, res);
      break;
    case 'GET':
      if (id) return getDetailDonorRequest(req, res);
      getDonorRequest(req, res);
      break;
    default:
      errorResponse(req, res, `Method ${req.method} not allowed`, 403);
      break;
  }
}

export default functions.region(defaultRegion).https.onRequest(
  cors(donorRequestController)
);