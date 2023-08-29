import * as firebaseAdmin from 'firebase-admin'
import { FirebaseServiceAccount } from '../config/firebase.config'

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(FirebaseServiceAccount),
})
