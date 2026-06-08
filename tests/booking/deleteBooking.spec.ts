import { test, expect } from '@playwright/test';
import { BookingClient } from '../../src/clients/bookingClient';
import { AuthClient } from '../../src/clients/authClient';

test ('DELETE booking should delete an existing booking', async ({request}) =>{

    const bookingClient = new BookingClient();
    const authClient = new AuthClient();

     const bookingPayload = {
        firstname: 'Gabriel',
        lastname: 'Cayoja',
        totalprice: 80,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-06-05',
            checkout: '2026-06-10',
            },
        additionalneeds: 'Breakfast',
    };

    const bookingId = await bookingClient.createBookingAndReturnId(request, bookingPayload);

    const token = await authClient.getToken(request);

    const deleteBookingResponse = await bookingClient.deleteBooking (request, bookingId,token);

    expect(deleteBookingResponse.status()).toBe(201);
});

