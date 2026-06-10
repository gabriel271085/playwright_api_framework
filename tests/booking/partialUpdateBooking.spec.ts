import { test, expect } from '../../src/fixtures/apiFixtures';
import { defaultBooking } from '../../src/data/bookingData';

test ('PATCH booking should update an existing booking partially', async({request, bookingClient, authClient}) =>{

    const bookingId = await bookingClient.createBookingAndReturnId(request, defaultBooking);

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
    expect(partialUpdateBookingBody.firstname).not.toBe(defaultBooking.firstname);
    
    expect(partialUpdateBookingBody.lastname).toBe(defaultBooking.lastname);
    expect(partialUpdateBookingBody.totalprice).toBe(defaultBooking.totalprice);
    expect(partialUpdateBookingBody.depositpaid).toBe(defaultBooking.depositpaid);
    expect(partialUpdateBookingBody.bookingdates.checkin).toBe(defaultBooking.bookingdates.checkin);
    expect(partialUpdateBookingBody.bookingdates.checkout).toBe(defaultBooking.bookingdates.checkout);

    
});