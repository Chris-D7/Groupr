export class Groupscollection{
    id: string;
    name: string;
    owner: string;
    participants: string[];
    events: string[];

    constructor(){
        this.id='';
        this.name='';
        this.owner='';
        this.participants=[];
        this.events=[];
    }
}