import { APIRequestContext } from "@playwright/test";

export class AuthClient {

     async createToken( request: APIRequestContext, payload: object) 
        {
        return await request.post('/auth', {
            data: payload
        })
    }
    
    async getToken(request: APIRequestContext) {

        const authPayload = {
            username: process.env.AUTH_USERNAME,
            password: process.env.AUTH_PASSWORD,
        };

        const response = await this.createToken(request, authPayload);
        const body = await response.json();

        return body.token
    }
    
   
}