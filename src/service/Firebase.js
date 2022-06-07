import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAss4VCfMa1ABwkxsPHfy3lHYZNsWV_rOk",
    authDomain: "simple-blog-2df89.firebaseapp.com",
    projectId: "simple-blog-2df89",
    storageBucket: "simple-blog-2df89.appspot.com",
    messagingSenderId: "508322664556",
    appId: "1:508322664556:web:afce88b807e5e2897e4849",
    measurementId: "G-Q8XWL5CQYF"  
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)