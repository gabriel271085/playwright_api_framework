import { test, expect } from '@playwright/test';
import { BookingClient } from '../../src/clients/bookingClient';
import { AuthClient } from '../../src/clients/authClient';

test ('PATCH booking should update an existing booking partially', async({request}) =>{

    const bookingClient = new BookingClient();
    const authClient = new AuthClient();

    const bookingPayload = {
        firstname: 'Gabriel',
        lastname: 'Cayoja',
        totalprice: 70,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-06-01',
            checkout: '2026-06-10',
            },
        additionalneeds: 'Breakfast',
    };

    const createBookingResponse = await bookingClient.createBooking(
            request,
            bookingPayload
        );

    const createBookingBody = await createBookingResponse.json();

    const bookingId = createBookingBody.bookingid;

    const authPayload = {
        username:'admin',
        password: 'password123'
    };

    const authResponse = await authClient.createToken(
        request,
        authPayload
    );

    const authBody = await authResponse.json();

    const token = authBody.token;

    const partialUpdatedBookingPayload = {
        firstname: 'Updated Gabriel',
    };

    const partialUpdateBookingResponse =
        await bookingClient.partialUpdateBooking (
            request,
            bookingId,
            partialUpdatedBookingPayload,
            token
        )
    
    expect (partialUpdateBookingResponse.status()).toBe(200);

    const partialUpdateBookingBody = await partialUpdateBookingResponse.json();

    expect(partialUpdateBookingBody.firstname).toBe(partialUpdatedBookingPayload.firstname);
    expect(partialUpdateBookingBody.firstname).not.toBe(bookingPayload.firstname);
    
    expect(partialUpdateBookingBody.lastname).toBe(bookingPayload.lastname);
    expect(partialUpdateBookingBody.totalprice).toBe(bookingPayload.totalprice);
    expect(partialUpdateBookingBody.depositpaid).toBe(bookingPayload.depositpaid);
    expect(partialUpdateBookingBody.bookingdates.checkin).toBe(bookingPayload.bookingdates.checkin);
    expect(partialUpdateBookingBody.bookingdates.checkout).toBe(bookingPayload.bookingdates.checkout);

    
});