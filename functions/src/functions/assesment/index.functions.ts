import * as functions from "firebase-functions";
import { successResponse, errorResponse, defaultRegion } from "../../helpers";
import { AppRequest } from "../../interfaces/Request";
import * as cors from 'cors';
const corsHandler = cors({origin: true});

export const assesment = async (req: AppRequest, res: functions.Response<any>) => corsHandler(req, res, ()=>{
  const {
    negative_covid,
    is_covid_survivor,
    covid_healed_date,
    age,
    weight,
    gender,
    have_pregnant,
    cronic_disease,
    transfused_record,
    last_transfused_date
  } = req.body; 

  try {
    let isEligible = true;
    const today: number = +new Date(new Date().toDateString());
    if (!negative_covid) isEligible = false;
    const healedDateDiff = today - Number(new Date(covid_healed_date));
    if (!(is_covid_survivor && healedDateDiff < 86400000 * 90)) isEligible = false;
    if (age<18 || age>60) isEligible = false;
    if (weight<55) isEligible = false;
    if (gender==='female' && have_pregnant) isEligible = false;
    if (cronic_disease) isEligible = false;
    const lastTransfusedDiff = today - Number(new Date(last_transfused_date));
    if (transfused_record && lastTransfusedDiff < 86400000 * 365) isEligible = false;
    
    successResponse(req, res, { isEligible });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, "Server Error");
  }
})

export default functions.region(defaultRegion).https.onRequest(assesment);