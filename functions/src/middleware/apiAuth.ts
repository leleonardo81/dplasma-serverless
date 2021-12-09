import { errorResponse } from '../helpers';
import User from '../models/user';
import { auth } from 'firebase-admin';
import * as functions from "firebase-functions";
import { AppRequest } from '../interfaces/Request';

const apiAuth = (next: Function) => async (req: AppRequest, res: functions.Response<any>) => {
  if (!(req.headers && req.headers.authorization)) {
    return errorResponse(req, res, 'Token is not provided', 401);
  }
  const token = req.headers.authorization;
  try {
    const authResp = await auth().verifyIdToken(token);
    const { uid } = authResp;
    const query = await User.find({ uid });
    const user = query.docs[0]?.data();
    if (!user) return errorResponse(req, res, 'User is not found in system', 401);
    req.user = user;
    await next(req, res);
  } catch (error) {
    return errorResponse(
      req,
      res,
      'Incorrect token is provided',
      401,
    );
  }
};

export default apiAuth;