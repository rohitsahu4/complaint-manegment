var admin = require("firebase-admin");

var serviceAccount = require("./complaint-manengment-firebase-adminsdk-yz7yj-69fa1d0b37.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://complaint-manengment.firebaseio.com"
});

const functions = require("firebase-functions");
const {
    Storage
} = require('@google-cloud/storage');
const gcs = new Storage({
    // config...
});
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const db = admin.database()
exports.countchange = functions.database.ref("/complaints/{complaint}").onWrite((change, context) => {
    console.log(change)
    var countRef = change.after.ref.parent.parent.child("Total")
    if (change.after._data.hasOwnProperty("imgUrl"))
        return null
    else {
        return countRef.transaction((current) => {
            return current + 1
        })

    }

});

exports.onFileChange = functions.storage.object().onFinalize((object) => {

    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    if (path.basename(filePath).startsWith('image')) {
        return; //do nothing
    }
    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = {
        contentType: contentType
    };
    console.log(bucket)
    var myBucket = admin.storage().bucket(bucket)
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return spawn('convert', [tmpFilePath, '-resize', '700x700', tmpFilePath]);
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: path.dirname(filePath) + '/image.' + path.basename(filePath).split('.').pop(),
            metadata: metadata
        })
    }).then((res) => {


        return myBucket.file(res[0].metadata.name).getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        }).then(err => {
            return db.ref("complaints/" + path.dirname(filePath)).child("imgUrl").set(err[0])
        }).then((a) => {
            console.log(a)
            return destBucket.file(filePath).delete()
        }).then(() => {
            return Promise.resolve("done")
        })
    })
});