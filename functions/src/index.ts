// import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import { exportFunctions } from 'better-firebase-functions';
 
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
var serviceAccount = require("../ta-leonardo-firebase-adminsdk-2tv6v-77c46a1e71.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exportFunctions({ __filename, exports, 
  searchGlob: '**/*.functions.js',
  funcNameFromRelPath: relPath=>relPath.split("/").slice(1).join("-").replace(/.functions.js|-index/g, "")
  
  // funcNameFromRelPath: relPath=>relPath.replace('functions/', '')
});
