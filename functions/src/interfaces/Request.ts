import * as functions from "firebase-functions";

export interface AppRequest extends functions.https.Request {
  user? : any
}
