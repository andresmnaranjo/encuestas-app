import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
    providedIn: 'root'
})
export class AppService {
    terminal = "";
    term: BehaviorSubject<string>;
    constructor() {
        this.term = new BehaviorSubject(this.terminal);
    }
 
    setTerminal(term : string) {
        this.terminal = term;
    }
}