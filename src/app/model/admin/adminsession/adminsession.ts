export class Adminsession {
    constructor (option = {}) {
        this.id = option['id'] || 0;
        this.email = option['email'] || '';
        this.password = option['password'] || '';
    }
    id: number;
    email: string;
    password: string;
}