import { test, expect } from '../../src/fixtures/apiFixtures';
import { BookingClient } from '../../src/clients/bookingClient';
import { defaultBooking } from '../../src/data/bookingData';


test ('POST booking should create a new booking', async ({request, bookingClient}) => {
    
       
    const response = await bookingClient.createBooking(
        request,
        defaultBooking

    ); 
       
    expect(response.status()).toBe(200);


     const body = await response.json();

    expect(body.bookingid).toBeDefined();
    expect(body.booking.firstname).toBe(defaultBooking.firstname);
    expect(body.booking.lastname).toBe(defaultBooking.lastname);
    expect(body.booking.totalprice).toBe(defaultBooking.totalprice);
    expect(body.booking.depositpaid).toBe(defaultBooking.depositpaid);

    });