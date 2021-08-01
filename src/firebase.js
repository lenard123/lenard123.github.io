import app from 'firebase/app'
import 'firebase/firestore'

app.initializeApp({
    apiKey: 'AIzaSyAss4VCfMa1ABwkxsPHfy3lHYZNsWV_rOk',
    authDomain: 'simple-blog-2df89.firebaseapp.com',
    projectId: 'simple-blog-2df89',
    storageBucket: 'simple-blog-2df89.appspot.com',
    messagingSenderId: '508322664556',
    appId: '1:508322664556:web:afce88b807e5e2897e4849',
})


export const firebase = app
export const db = app.firestore()