import { meterOne } from './meterOne';
import { meterTwo } from './meterTwo';
import { meterThree } from './meterThree';
import { meterFour } from './meterFour';
import { petrolCal } from './petrolCal';
import { diselCal } from './diselCal';

export class meterDetails{

    date: string;
    m1= new meterOne();
    m2= new meterTwo();
    m3= new meterThree();
    m4= new meterFour();
    ptCal= new petrolCal();
    diselCal= new diselCal();
}