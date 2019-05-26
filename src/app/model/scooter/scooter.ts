import { Register } from '../register/register';

export class Scooter {
    constructor(){
        this.scooterhistorico = new Register();
    }
    id : Number;
    numeroserial : String;
    encendido : boolean;
    enuso: boolean;
    eliminado: boolean;
    scooterhistorico : Register;
}
