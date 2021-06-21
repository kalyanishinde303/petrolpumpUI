import { transaction } from './transaction';

export class customer {

    id : number ;
    name : string;
    date:string;
    address:string;
    mobile:string;
    email:string;
    balance: number;
    transactions : transaction[] = [];

    
}