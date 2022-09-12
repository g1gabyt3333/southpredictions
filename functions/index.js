const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.changeTally = functions.firestore
    .document("predictions/{predictionId}/votes/{voteId}")
    .onCreate(async function (snap, context) {
        const data = snap.data();
        const predictionId = context.params.predictionId;
        const voteId = context.params.voteId;

        const predictionRef = db.collection("predictions").doc(predictionId);
        const prediction = await predictionRef.get();
        let predictionData = prediction.data();
        predictionData.results[data.vote]++;
        await predictionRef.update(predictionData);

        functions.logger.log("Changing tally for", predictionId, "by 1");
    });

exports.changeTallyPrivate = functions.firestore
    .document("privatePredictions/{predictionId}/votes/{voteId}")
    .onCreate(async function (snap, context) {
        const data = snap.data();
        const predictionId = context.params.predictionId;
        

        const predictionRef = db.collection("privatePredictions").doc(predictionId);
        const prediction = await predictionRef.get();
        let predictionData = prediction.data();
        predictionData.results[data.vote]++;
        await predictionRef.update(predictionData);

        functions.logger.log("Changing tally for", predictionId, "by 1");
    });
exports.createUser = functions.auth.user().onCreate(async function (user) {
    if (user.email.split("@")[1] !== "wwprsd.org") {
        functions.logger.log("User not from WWPRSD, not creating account");
    } else {
        const db = admin.firestore();
        const userRef = db.collection("user").doc(user.uid);
        await userRef.set({
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            admin: false,
            private: false,
            predictions: {
                wins: 0,
                losses: 0,
            },
        });
    }
});

exports.getUsers = functions.https.onCall((data, context) => {
    return auth;
});

exports.getLeaderboard = functions.https.onCall(async function (data, context) {
    if (
        !context.auth ||
        context.auth.token.email.split("@")[1] !== "wwprsd.org"
    ) {
        return {
            error: "You are not authorized to do this",
        };
    }
    const db = admin.firestore();
    const users = db
        .collection("user")
        .orderBy("predictions.wins", "desc")
        .limit(10);

    const lbData = (await users.get()).docs;
    const leaderboard = lbData.map((doc) => {
        return {
            name: doc.data().name,
            wins: doc.data().predictions.wins,
            losses: doc.data().predictions.losses,
        };
    });

    return leaderboard;
});

exports.processPrediction = functions.firestore
    .document("predictions/{predictionId}")
    .onUpdate(async function (change, context) {
        let choice = "";
        if (change.after.data().isCompleted === true) {
            choice = change.after.data().answer;
        } else {
            functions.logger.log("Prediction not completed not processing");
            return;
        }
        const predictionId = context.params.predictionId;
        functions.logger.log(
            "Processing prediction",
            context.params.predictionId,
            "with choice",
            choice
        );
        let userPredictions = (
            await db.collection("/predictions/" + predictionId + "/votes").get()
        ).docs.map((doc) => {
            const q2 = db.collection("/user").doc(doc.id);

            q2.get().then((data) => {
                functions.logger.log(data);
                if (doc.data().vote === choice) {
                    q2.update({
                        predictions: {
                            wins: data.data().predictions.wins + 1,
                            losses: data.data().predictions.losses,
                        },
                    }).then(() => {
                        q2.collection("/votes")
                            .doc(context.params.predictionId)
                            .set({
                                vote: doc.data().vote,
                                isCorrect: true,
                            });
                    });
                } else {
                    q2.update({
                        predictions: {
                            wins: data.data().predictions.wins,
                            losses: data.data().predictions.losses + 1,
                        },
                    }).then(() => {
                        q2.collection("/votes")
                            .doc(context.params.predictionId)
                            .set({
                                vote: doc.data().vote,
                                isCorrect: false,
                            });
                    });
                }
            });
        });

        return userPredictions;
    });

exports.docTemplate = functions.https.onCall(async function (data, context) {
    let data2 = await db.collection("/predictions").get();
    let arr = [];

    for (let doc of data2.docs) {
        arr.push(doc.data());
    }
    return arr;
});
// exports.makeUser = functions.https.onCall(function (data, context) {
//     const auth = admin
//         .auth()
//         .listUsers(1000)
//         .then((users) => {
//             return users;
//         })
//         .catch((error) => {
//             return error;
//         });
//     return auth;
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
