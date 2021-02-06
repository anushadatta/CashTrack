import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NavigationEnd, Router } from "@angular/router";
import * as moment from "moment";
import { CookieService } from "ngx-cookie-service";
import { NGXLogger } from "ngx-logger";
import { of, ReplaySubject, Subscription, zip } from "rxjs";
import { filter } from "rxjs/operators";
import { CookieKeys, NavigationState, UserType } from "src/app/common/enum";
import {
  accessRight,
  consumptionList,
  generationList,
} from "src/app/common/variable";
import { GlobalService } from "src/app/services/global.service";
import { HttpService } from "src/app/services/http.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { MessageService } from "src/app/services/message.service";
import { ThemeService } from "src/app/services/theme.service";
import {
  ApiResponseType,
  ForecastDataCountRes,
  SideBar,
  SidebarCategory,
} from "src/app/types/common.type";
import { SubSink } from "subsink";
import { FormModalComponent } from "../form-modal/form-modal.component";
import {
  bottomNavList,
  dashboardElement,
  supportNavList,
  payNavList
} from "../side-bar-new/NavLists";
import { LoggingService } from "./../../services/logging.service";

@Component({
  selector: "app-app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.css"],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  /**
   * naVitemList will contain all the links based on conditional rendering
   * sidebarCategories will contain the different category headers
   */
  navItemList: ReplaySubject<SideBar[]>;
  sidebarCategories: ReplaySubject<SidebarCategory[]>;

  /**
   * siteNavList holds the link
   * sitelist hold data of the actual site
   */
  siteNavList = [];
  siteList = [];

  renderHeatMap: boolean = true;

  /**
   * List of generation and consumption to be passed on to side bar
   */
  generationList: AnalyticsAsset[] = [];
  consumptionList: AnalyticsAsset[] = [];

  /**
   * User Data
   * Types such as admin, user, site, demo_user
   */
  user_type: string;

  user_id: number;
  site_id: number;
  site_user_id: number;

  userChanged = false;
  dateBySiteId = {};

  navigationPath: string;

  where_performance = ["AC-Power", "ac-power", "AC-POWER"];

  accessRights;
  pageName = "appLayoutPage";

  subSink: SubSink;

  activeNavState: NavigationState;
  navSubscription: Subscription;
  route;

  assets = ["solar", "dg", "grid", "hvac", "light", "lift", "load"];

  constructor(
    private cookie: CookieService,
    private localStorage: LocalStorageService,
    private http: HttpService,
    private router: Router,
    private msg: MessageService,
    private globalService: GlobalService,
    private dialog: MatDialog,
    private theme: ThemeService,
    private logger: NGXLogger,
    private customLogger: LoggingService
  ) {
    this.logger.registerMonitor(this.customLogger);
  }

  ngOnInit() {
    this.theme.setTheme();
    this.subSink = new SubSink();

    this.navItemList = new ReplaySubject(1);
    this.sidebarCategories = new ReplaySubject(1);

    this.user_type = 'user';

    this.user_id = parseInt('11');
    this.site_user_id = parseInt(this.cookie.get(CookieKeys.site_user_id));

    /**
     * Detect when navigation finishes, then call updateNavBar
     */
    this.subSink.sink = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === "/dashboard/home") {
          this.cookie.delete(CookieKeys.user_id);
          this.removeTheme();
        }
        this.funUpdateNavBar(event.url);
        this.renderHeatMap = true;
      });

    // this.subSink.sink = this.msg.renderHeatMap$.subscribe((status) => {
    //   this.renderHeatMap = status;
    //   const routeString = this.router.url;
    //   const assetId = routeString.split("/")[routeString.split("/").length - 1];
    //   if (this.assets.includes(assetId)) {
    //     this.funCreateSiteList(() => {
    //       const partialNavList = this.funCreateAssetNavList(assetId);
    //       this.funSetSiteId();
    //       this.funGetDeviceList(this.site_id, partialNavList);
    //     });
    //   }
    // });

    // Get access rights on refresh
    // if (typeof this.accessRights == "undefined" && this.site_id) {
    //   this.funModifyAccess();
    // }

    this.funUpdateNavBar(this.router.url);

    this.route = this.router.url;
  }

  funUpdateNavBar(routeString: string) {
    // Include Dashboard icon if in the home page
    this.funCreateLandingPageNavList();
    this.activeNavState = NavigationState.landingState;
  }

  /**
   * sends new navlist to subscribers
   * @param navList
   */
  funUpdateSideBarList(navList: SideBar[]) {
    // let newBottomNavList = bottomNavList;

    // // for loola public user remove contact-us and settings link
    // const removeList = ["settings", "contact-us"];

    // if (this.site_user_id == 53) {
    //   newBottomNavList = newBottomNavList.filter(
    //     (nItem) => !removeList.includes(nItem.id)
    //   );
    // }
    this.navItemList.next([...navList]);
  }

  /**
   * Sends category list to subcribers
   * @param categoryList
   */
  funUpdateSideBarCategories(categoryList: SidebarCategory[]) {
    this.sidebarCategories.next(categoryList);
  }

  funCreateLandingPageNavList() {
    let _sideNavItemList: SideBar[] = [];

    _sideNavItemList = [...bottomNavList, ...payNavList, dashboardElement, ...supportNavList];

    this.funUpdateSideBarList(_sideNavItemList);
    this.funUpdateSideBarCategories([
      {
        id: "dashboard",
        title: "Dashboard",
        expanded: true,
      },
      {
        id: "support",
        title: "Support",
        expanded: true,
      },
      {
        id: "logout",
        title: "Logout",
        expanded: true,
      },
    ]);
  }


  /**
   * @function funSetSiteId()
   * Sets the site id of the user
   */
  private funSetSiteId() {
    let localStorage_site_id = this.localStorage.getItem(CookieKeys.site_id);
    if (localStorage_site_id != null) {
      this.site_id = parseInt(localStorage_site_id);
    } else {
      this.site_id = parseInt(this.cookie.get(CookieKeys.site_id));
    }
  }

  /**
   * Handle redirect for logging being clicked
   */
  funLogoClicked() {
    this.router.navigate(["dashboard/landing-page"]);
  }

  navItemClicked(id: string) {
    if(id === 'logout') {
      this.cookie.deleteAll();
      this.router.navigateByUrl('/');
    }

    if(id=='personal_expenses') {
      console.log(id);
      this.router.navigateByUrl('/dashboard/personal-expense')
    }

    if(id=='home') {
      console.log(id);
      this.router.navigateByUrl('/dashboard/landing-page')
    }
   
    console.log(`clicked on id: ${id}`);
  }

  /**
   * scroll to top in every navigation
   */
  onActivate() {
    window.scroll(0, 0);
  }

  /**
   * Remove css theme for custom clients
   */
  removeTheme() {
    this.theme.removeTheme();
  }

  ngOnDestroy() {
    if (this.subSink) this.subSink.unsubscribe();
  }
}

class AnalyticsAsset {
  id: string;
  assetName: string;
  link: string;
  icon?: string;
  display?: string;
}

class SiteItem {
  site_id: number;
  user_id: number;
  sitename: string;
  icon: string;
}
