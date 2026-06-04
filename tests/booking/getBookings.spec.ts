import {test, expect} from '@playwright/test';
 

test ('GET booking should returns a list of  booking IDs', async({request}) =>{

    const response= await request.get('/booking');

    expect(response.status()).toBe(200)

    const body = await response.json();
    console.log(body);

    expect(Array.isArray(body)).toBeTruthy(); 
    expect(body.length).toBeGreaterThan(0);
    expect(body[0].bookingid).toBeDefined();
    
    expect(typeof body[0].bookingid).toBe('number');


})
