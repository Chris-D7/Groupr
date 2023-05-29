import { DatePipe, Time } from "@angular/common";

export class Eventcollection{
    times:Array<{email: string, username:string, time:Array<number>, day:Date}>;
    desc: string;
    group: string;
    owner: {email: string, username: string}|null;
    title: string;
    id:string;

    constructor(){
        this.times=[];
        this.desc='';
        this.group='';
        this.owner=null;
        this.title='';
        this.id='';
    }
}