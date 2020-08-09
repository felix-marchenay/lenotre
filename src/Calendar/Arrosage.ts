export class Arrosage
{
    constructor (
        public start: Date,
        public end: Date,
        public id: string,
        public summary: string
    ) {}

    private get enCours(): boolean
    {
        const now = new Date;
        return now < this.end && now > this.start;
    }

    private get done(): boolean
    {
        return this.summary.match(/-OK/) !== null;
    }

    get aTraiter(): boolean
    {
        return !this.done && this.enCours;
    }

    static fromPayload(payload): Arrosage
    {
        console.log(payload);
        return new Arrosage(
            new Date(payload.start.dateTime),
            new Date(payload.end.dateTime),
            payload.id,
            payload.summary === undefined ? '' : payload.summary,
        );
    }
}