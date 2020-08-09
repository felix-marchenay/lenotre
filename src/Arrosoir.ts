import { Gpio } from "onoff";

export class Arrosoir
{
    constructor (private pompeOut: Gpio) {}

    run(): void {
        console.log('Activation de la pompe');
        this.pompeOut.writeSync(1);
    
        setTimeout(() => {
            this.pompeOut.writeSync(0);
            console.log('Désactivation.');
        }, 3000);    
    }
}