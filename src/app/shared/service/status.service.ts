import {Injectable} from '@angular/core';
import {MenuVo} from "@shared/model/erupt-menu";

@Injectable({
    providedIn: 'root'
})
export class StatusService {

    private _isMicroApp: boolean = false;

    isFillLayout: boolean = false;

    menus: MenuVo[] = [];

    get isMicroApp(): boolean {
        return this._isMicroApp;
    }

    set isMicroApp(value: boolean) {
        this._isMicroApp = value;
        localStorage.setItem('microApp', value.toString());
    }

    constructor() {
        let microApp = localStorage.getItem('microApp');
        if(microApp) {
            this._isMicroApp = microApp === 'true';
        }
    }
}
