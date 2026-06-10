import { test as base, expect } from '@playwright/test';
import { AuthClient } from '../clients/authClient';
import { BookingClient } from '../clients/bookingClient';

type ApiFixtures = {
    authClient: AuthClient;
    bookingClient: BookingClient;
};

export const test = base.extend<ApiFixtures> ({ 
    authClient: async ({}, use) =>{
    await use(new AuthClient());
    },

    bookingClient: async ({}, use) => {
        await use(new BookingClient());
    },

});

export {expect} from '@playwright/test';