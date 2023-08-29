import { ServiceAccount } from 'firebase-admin/lib/app/credential'
import { ActionCodeSettings } from 'firebase-admin/lib/auth'

export const FirebaseServiceAccount: ServiceAccount = {
    projectId: process.env.FSA_PROJECT_ID,
    privateKey: process.env.FSA_PRIVATE_KEY,
    clientEmail: process.env.FSA_CLIENT_EMAIL,
}

export const FirebaseActionCodeSettings: ActionCodeSettings = {
    handleCodeInApp: true,
    url: `${process.env.CLIENT_URL}/auth/login`,
}

export const FirebaseURLs = {
    signinWithPassword: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
}
