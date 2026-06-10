import { test, expect } from '../../src/fixtures/apiFixtures';
import { defaultBooking, defaultUpdatedBooking } from '../../src/data/bookingData';

test ('PUT booking should update an existing booking', async({request, bookingClient, authClient}) =>{

    const bookingId = await bookingClient.createBookingAndReturnId(request, defaultBooking);
        
    const token = await authClient.getToken(request);

   

    const updateBookingResponse =
        await bookingClient.updateBooking (request, bookingId, defaultUpdatedBooking, token
        )
     
    expect (updateBookingResponse.status()).toBe(200);

    const updateBookingBody = await updateBookingResponse.json();

    expect(updateBookingBody.firstname).toBe(defaultUpdatedBooking.firstname);
    expect(updateBookingBody.lastname).toBe(defaultUpdatedBooking.lastname);
    expect(updateBookingBody.totalprice).toBe(defaultUpdatedBooking.totalprice);
    expect(updateBookingBody.depositpaid).toBe(defaultUpdatedBooking.depositpaid);
    expect(updateBookingBody.bookingdates.checkin).toBe(defaultUpdatedBooking.bookingdates.checkin);
    expect(updateBookingBody.bookingdates.checkout).toBe(defaultUpdatedBooking.bookingdates.checkout);
    expect(updateBookingBody.additionalneeds).toBe(defaultUpdatedBooking.additionalneeds);


    

});