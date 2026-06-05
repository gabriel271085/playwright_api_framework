import {test, expect} from '@playwright/test';
import { AuthClient } from '../../src/clients/authClient';
import { BookingClient } from '../../src/clients/bookingClient';

test ('PUT booking should update an existing booking', async({request}) =>{

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
    
    const createBookingResponse =
        await bookingClient.createBooking(
            request,
            bookingPayload
        );

        const createBookingBody =
            await createBookingResponse.json();

        const bookingId =
        createBookingBody.bookingid;
        
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

    const updatedBookingPayload = {
        firstname: 'Updated Gabriel',
        lastname: 'Updated Cayoja',
        totalprice: 100,
        depositpaid: false,
        bookingdates: {
            checkin: '2026-07-01',
            checkout: '2026-07-10',
            },
        additionalneeds: 'Dinner',
    }

    const updateBookingResponse =
        await bookingClient.updateBooking (
            request,
            bookingId,
            updatedBookingPayload,
            token
        )
     
    expect (updateBookingResponse.status()).toBe(200);

    const updateBookingBody = await updateBookingResponse.json();

    expect(updateBookingBody.firstname).toBe(updatedBookingPayload.firstname);
    expect(updateBookingBody.lastname).toBe(updatedBookingPayload.lastname);
    expect(updateBookingBody.totalprice).toBe(updatedBookingPayload.totalprice);
    expect(updateBookingBody.depositpaid).toBe(updatedBookingPayload.depositpaid);
    expect(updateBookingBody.bookingdates.checkin).toBe(updatedBookingPayload.bookingdates.checkin);
    expect(updateBookingBody.bookingdates.checkout).toBe(updatedBookingPayload.bookingdates.checkout);
    expect(updateBookingBody.additionalneeds).toBe(updatedBookingPayload.additionalneeds);


    

});