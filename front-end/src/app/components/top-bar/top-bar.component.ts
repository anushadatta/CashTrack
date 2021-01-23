import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { CookieKeys } from "src/app/common/enum";
import { HttpService } from "src/app/services/http.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { ThemeService } from "src/app/services/theme.service";
import {
    SideBar,
    ApiResponseType,
    SiteDetail,
} from "src/app/types/common.type";
import { SubSink } from "subsink";
import { MessageService } from "src/app/services/message.service";

@Component({
    selector: "app-top-bar",
    templateUrl: "./top-bar.component.html",
    styleUrls: ["./top-bar.component.scss"],
})
export class TopBarComponent implements OnInit, OnDestroy {
    @Input() navItemList: Observable<SideBar[]>;
    @Output() sideBarItemClicked = new EventEmitter<string>();

    subsink: SubSink;

    sidebarItems: SideBar[] = [];
    requiredList = ["notifications", "logout"];

    customTheme = false;

    clientID;

    sitename = "";
    mobileView = false;
    userId;
    site_id;
    sidebarOpen;

    siteUrls = [
        "/dashboard/admin",
        "/dashboard/user",
        "/dashboard/site",
        "/dashboard/tv-overview",
        "/dashboard/forecast",
    ];

    constructor(
        private theme: ThemeService,
        private router: Router,
        private cookie: CookieService,
        private localStorage: LocalStorageService,
        private http: HttpService,
        private msg: MessageService
    ) {}

    ngOnInit() {
        this.subsink = new SubSink();
        this.subsink.sink = this.navItemList.subscribe((item) => {
            this.sidebarItems = item.filter((x) =>
                this.requiredList.includes(x.id)
            );
        });
        this.subsink.sink = this.theme.customTheme.subscribe((status) => {
            this.customTheme = status;
        });
        this.subsink.sink = this.theme.clientId$.subscribe(
            (id) => (this.clientID = id)
        );

        this.getUserId();
        this.getSiteId();
        this.getUserDetail();

        this.subsink.sink = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.url.split("/").splice(0, 3).join("/");
                this.getUserId();
                this.getSiteId();
                if (this.siteUrls.includes(url)) {
                    this.getUserDetail();
                } else {
                    this.sitename = "";
                }
            }
        });

        this.subsink.sink = this.msg.siteIdList$.subscribe((site_id) => {
            this.site_id = site_id;
        });

        this.subsink.sink = this.msg.isSidebarWidthChanged$.subscribe(
            (status) => {
                this.sidebarOpen = status;
            }
        );
    }

    getUserDetail() {
        if (this.site_id && this.userId) {
            let param = { user_id: this.userId, site_id: this.site_id };
            this.subsink.sink = this.http
                .funGetSiteDetail(param)
                .subscribe((res: ApiResponseType<SiteDetail[]>) => {
                    if (res.data[0]) {
                        const url = this.router.url
                            .split("/")
                            .splice(0, 3)
                            .join("/");
                        if (this.siteUrls.includes(url)) {
                            this.sitename = res.data[0].sitename;
                        }
                    }
                });
        }
    }
    sideBarClicked(navLink: SideBar) {
        this.sideBarItemClicked.emit(navLink.id);
    }

    onResize(e) {
        if (e.target.innerWidth < 800) {
            this.mobileView = true;
        } else {
            this.mobileView = false;
        }
    }

    getUserId() {
        this.userId = parseInt('11');
    }

    getSiteId() {
        let localStorage_site_id = this.localStorage.getItem(
            CookieKeys.site_id
        );
        if (localStorage_site_id != null) {
            this.site_id = localStorage_site_id;
        } else {
            this.site_id = parseInt(this.cookie.get(CookieKeys.site_user_id));
        }
    }

    removeTheme() {
        this.theme.removeTheme();
    }

    redirect(path) {
        this.router.navigate([path]);
    }

    trackById(index, item) {
        return item.id;
    }

    ngOnDestroy() {
        this.subsink.unsubscribe();
    }
}
