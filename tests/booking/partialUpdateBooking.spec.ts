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

    const bookingId = await bookingClient.createBookingAndReturnId(request, bookingPayload);

    const token = await authClient.getToken(request);

    const partialUpdatedBookingPayload = {
        firstname: 'Updated Gabriel',
    };

    const partialUpdateBookingResponse = await bookingClient.partialUpdateBooking (
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