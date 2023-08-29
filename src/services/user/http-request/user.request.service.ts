import axios, { AxiosInstance } from 'axios'
import { FirebaseURLs } from '../../../config/firebase.config'
import HttpException from '../../../utils/global/httpException'
import { BAD_GATEWAY } from 'http-status'

export class UserRequestService {
    private readonly reqInstance: AxiosInstance = axios.create({})

    async loginFirebaseUser(email: string, password: string) {
        try {
            const response = await this.reqInstance.post(
                FirebaseURLs.signinWithPassword,
                {
                    email,
                    password,
                    returnSecureToken: true,
                },
            )
            return response.data
        } catch (e) {
            throw new HttpException(
                e?.response?.status || BAD_GATEWAY,
                e?.response?.data?.error?.message || 'Error while logging in user',
            )
        }
    }
}
