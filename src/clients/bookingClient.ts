import { APIRequestContext } from "@playwright/test";

export class BookingClient{

    async createBooking(request: APIRequestContext,payload: object)
     {
    
        return await request.post('/booking', {data:payload});
    
    }

    async createBookingAndReturnId(request: APIRequestContext, payload: object)
    {
        const response = await this.createBooking(request, payload);
        
        const body = await response.json();

        return body.bookingid;
    }


    async updateBooking (request: APIRequestContext, bookingId: number, payload: object, token: string) 
    {
        return await request.put(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            },
            data: payload,
        });

    }

    async partialUpdateBooking (
        request: APIRequestContext,
        bookingId: number,
        payload: object,
        token: string
    ) {
        return await request.patch(`/booking/${bookingId}`, {
          headers: {
                Cookie: `token=${token}`
            },
            data: payload,
        });

    }

    async deleteBooking (
        request: APIRequestContext,
        bookingId: number,
        token: string
    ) {
        return await request.delete(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            }, 

        });
    }
}