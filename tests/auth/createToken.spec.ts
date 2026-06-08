import { test, expect } from '@playwright/test';
import { AuthClient } from '../../src/clients/authClient'

test('POST auth should return a token', async ({request}) =>{

    const authClient = new AuthClient();

    const token = await authClient.getToken(request);

   
    expect(response.status()).toBe(200)

    const body = await response.json();

    console.log(body);
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);


});