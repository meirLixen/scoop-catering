const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("./config/service-account-file.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://auth-development-e725a.firebaseio.com",
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
// const db = admin.database();
const FBAuth = admin.auth();
// FBAuth.verifyIdToken

module.exports = FBAuth;
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function (snapshot) {
//   console.log(snapshot.val());
// });
