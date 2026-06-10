import { test, expect } from '../../src/fixtures/apiFixtures';
import { defaultBooking } from '../../src/data/bookingData';

test ('DELETE booking should delete an existing booking', async ({request,bookingClient, authClient }) =>{

    
    const bookingId = await bookingClient.createBookingAndReturnId(request, defaultBooking);

    const token = await authClient.getToken(request);

    const deleteBookingResponse = await bookingClient.deleteBooking (request, bookingId,token);

    expect(deleteBookingResponse.status()).toBe(201);
});

