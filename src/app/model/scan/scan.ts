import { Cliente } from '../cliente/cliente';
import { Scooter } from '../scooter/scooter';

export class Scan {
    id : number;
    fecha : Date;
    cliente : Cliente;
    scooter : Scooter;
}
