export class Adminsession {
    constructor (option = {}) {
        this.Id = option['Id'] || 0;
        this.Mail = option['Mail'] || '';
        this.Token = option['Token'] || '';
    }
    Id: number;
    Mail: string;
    Pass: string;
    Token: string;
}