import * as corsModule from 'cors';
import { AppRequest } from '../interfaces/Request';
import * as functions from "firebase-functions";

const corsHandler = corsModule({origin: true});

const cors = (next: Function) => 
  async (req: AppRequest, res: functions.Response<any>) => 
  corsHandler(req, res, async () => next(req, res))

export default cors;