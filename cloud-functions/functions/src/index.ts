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
    const avidoId = context.params.avisoid;
    const favoritoID = context.params.favoritoid;
    const favoritosRef = admin.firestore().collection("favoritosUsuario").doc(uid).collection("avisos").doc(avidoId)
    favoritosRef.set({ favorito: favoritoID })
    return true 
});
exports.favoritoEliminado = functions.firestore.document('avisos/{avisoid}/favoritos/{favoritoid}').onDelete((change, context) => {
    const uid = change.get("uid");
    const avidoId = context.params.avisoid;
    const favoritosRef = admin.firestore().collection("favoritosUsuario").doc(uid).collection("avisos").doc(avidoId)
    favoritosRef.delete()
    return true
});