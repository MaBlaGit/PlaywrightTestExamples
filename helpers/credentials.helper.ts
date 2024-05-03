import { Credentials } from '@root/helpers/index';

export const credentials: Credentials = {
    valid: {
        username: 'admin',
        password: 'admin'
    },
    invalid: [
        { username: 'wronguser', password: 'wrongpassword' },
        { username: 'admin', password: 'wrongpassword' },
        { username: 'wronguser', password: 'admin' }, 
    ],
}