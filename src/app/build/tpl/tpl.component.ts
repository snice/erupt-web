import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from "@shared/service/data.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SettingsService} from "@delon/theme";
import { StatusService } from '@shared/service/status.service';

@Component({
    selector: 'app-tpl',
    templateUrl: './tpl.component.html'
})
export class TplComponent implements OnInit, OnDestroy {

    url: string;

    renderType: 'micro-app' | 'iframe' = "iframe";

    name: string;

    spin: boolean = true;

    @ViewChild('micro', {static: false}) microApp: ElementRef;

    private router$: Subscription;

    constructor(private dataService: DataService,
                private statusService: StatusService,
                public settingSrv: SettingsService,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.router$ = this.route.params.subscribe((params) => {
            this.name = params.name;
            if(this.statusService.isMicroApp) this.renderType = 'micro-app';
            this.url = this.dataService.getEruptTpl(params.name);
            if (this.renderType === 'micro-app') {
                this.url = window.location.origin + window.location.pathname + this.url;
            }
        });
    }

    ngOnDestroy(): void {
        this.router$.unsubscribe();
        let appName = this.microApp && this.microApp.nativeElement && this.microApp.nativeElement.appName;
        if (appName) {
            // 卸载micro-app
            (window as any).exports.unmountApp(appName, {clearAliveState: true}).then(() => {
                // 卸载成功
            });
        }
    }

    iframeLoad() {
        this.spin = false;
    }

}
