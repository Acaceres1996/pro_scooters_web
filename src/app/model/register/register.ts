export class Register {
    constructor (option = {}) {
        this.latitud = option['latitud'] || 'desconocido';
        this.longitud = option['longitud'] || 'desconocido';
        this.bateria = option['bateria'] || 0;
    }
    latitud : String;
    longitud : String;
    bateria : Number;
}
