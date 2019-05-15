export class Admin {
    constructor (option = {}) {
        this.id = option['id'] || 0;
        this.usuario = option['usuario'] || '';
        this.password = option['password'] || '';
    }
    id:Number;
    usuario : string;
    password : string;
}
