export class UserFront {
    Id: string;
    Name: string;
    LastName: string;
    Mail: string;
    Pass: string;
}

export class UserSession {
    constructor (option = {}) {
        this.Enabled = option['Enabled'] || false;
        this.Id = option['Id'] || 0;
        this.LastName = option['LastName'] || '';
        this.Mail = option['Mail'] || '';
        this.Name = option['Name'] || '';
        this.Token = option['Token'] || '';
        this.Type = option['Type'] || '';
    }

    Enabled: boolean;
    Id: number;
    LastName: string;
    Mail: string;
    Name: string;
    Pass: string;
    Token: string;
    Type: string;
}
