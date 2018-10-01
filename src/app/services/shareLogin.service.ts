import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ShareLoginService {
    logged = false;

    loggedSource = new BehaviorSubject<boolean>(this.logged);

    setLogin(val) {
        this.loggedSource.next(val);
    }
}

