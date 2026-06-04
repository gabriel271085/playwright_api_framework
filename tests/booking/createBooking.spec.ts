import { test, expect } from '@playwright/test';
import { BookingClient } from '../../src/clients/bookingClient';


test ('POST booking should create a new booking', async ({request}) => {
    
    const bookingClient = new BookingClient();


    const bookingPayload = {

        firstname: 'Gabriel',
        lastname: 'Cayoja', 
        totalprice: 70,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-06-01',
            checkout: '2026-06-10',
    },
    additionalneeds: 'Breakfast'
}

    const response = await bookingClient.createBooking(
        request,
        bookingPayload

    ); 
       
    expect(response.status()).toBe(200);


     const body = await response.json();

    expect(body.bookingid).toBeDefined();
    expect(body.booking.firstname).toBe(bookingPayload.firstname);
    expect(body.booking.lastname).toBe(bookingPayload.lastname);
    expect(body.booking.totalprice).toBe(bookingPayload.totalprice);
    expect(body.booking.depositpaid).toBe(bookingPayload.depositpaid);

    });