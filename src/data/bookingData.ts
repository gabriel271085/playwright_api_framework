import { BookingRequest } from '../interfaces/booking.interface';

export const defaultBooking: BookingRequest = {
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

export const defaultUpdatedBooking: BookingRequest = {
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