import { APIRequestContext } from "@playwright/test";

export class BookingClient{

    async createBooking(
        request: APIRequestContext,
        payload: object
    ) {
        
        return await request.post('/booking', {
            data:payload
        });
    
    }

    async updateBooking (
        request: APIRequestContext,
        bookingId: number,
        payload: object,
        token: string
    ) {
        return await request.put(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            },
            data: payload,
        });

    }
    
}