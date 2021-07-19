import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

app.initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
})


export const db = app.firestore()
export const auth = app.auth()

export const TimeStamp = app.firestore.TimeStamp
export const GeoPoint = app.firestore.GeoPoint
export const FieldValue = app.firestore.FieldValue
export const firebase = app

db.settings.timestampsInSnapshots = true

