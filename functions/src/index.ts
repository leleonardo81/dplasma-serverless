import * as admin from 'firebase-admin';
import { exportFunctions } from 'better-firebase-functions';
 
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

var serviceAccount = require("../new-ta-leonardo-firebase-adminsdk-i9i1n-505d834529.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exportFunctions({ __filename, exports, 
  searchGlob: '**/*.functions.js',
  funcNameFromRelPath: relPath=>relPath.split("/").slice(1).join("-").replace(/.functions.js|-index/g, "")
});
