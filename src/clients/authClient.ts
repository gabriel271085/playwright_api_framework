import { APIRequestContext } from "@playwright/test";

export class AuthClient {

    async createToken(request: APIRequestContext, payload: object) {
        return await request.post('/auth', {
            data: payload
        })
    }

}