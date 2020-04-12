import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.favoritoAgregado = functions.database.ref('avisos/{avisoid}/favoritos/{favoritoid}').onWrite((snap, context) => {
exports.favoritoAgregado = functions.firestore.document('avisos/{avisoid}/favoritos/{favoritoid}').onCreate((change, context) => {
    const uid=change.get("uid");
    const avisoId = context.params.avisoid;
    const favoritoID = context.params.favoritoid;
    const avisoDoc = admin.firestore().collection('avisos').doc(avisoId).get().then(function (querySnapshot:any) {
        console.log( querySnapshot.data().nombre);
    })
        .catch(function (error:any) {
            console.log("o no maldicion: ", error);
        });
    console.log(avisoDoc)
    const favoritosRef = admin.firestore().collection("favoritosUsuario").doc(uid).collection("avisos").doc(avisoId)
    favoritosRef.set({ favorito: favoritoID })
    return true 
});
exports.favoritoEliminado = functions.firestore.document('avisos/{avisoid}/favoritos/{favoritoid}').onDelete((change, context) => {
    const uid = change.get("uid");
    const avisoId = context.params.avisoid;
    const favoritosRef = admin.firestore().collection("favoritosUsuario").doc(uid).collection("avisos").doc(avisoId)
    favoritosRef.delete()
    return true
});