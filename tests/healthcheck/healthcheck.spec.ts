import { test, expect } from '@playwright/test';

test('GET ping should return 201', async ({ request }) => {

    const response = await request.get('/ping');
    expect(response.status()).toBe(201);

    const body = await response.text();
    expect(body).toBe('Created');
})