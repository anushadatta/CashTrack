// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import { Router, NavigationEnd } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { MessageService } from '../../services/message.service';
// import { MatDialog } from '@angular/material/dialog';
// import { FormModalComponent } from 'src/app/components/form-modal/form-modal.component';
// import { SubSink } from 'subsink';
// import { Subscription, ReplaySubject, zip, of } from 'rxjs';
// import { filter } from 'rxjs/operators';
// import { accessRight, generationList, consumptionList } from 'src/app/common/variable';
// import * as moment from 'moment';
// import { LocalStorageService } from 'src/app/services/local-storage.service';
// import { SideBar, ApiResponseType, ForecastDataCountRes } from 'src/app/types/common.type';
// import { CookieKeys, UserType } from 'src/app/common/enum';
// import { GlobalService } from 'src/app/services/global.service';
// import { ThemeService } from "src/app/services/theme.service";

// @Component({
//   selector: "app-app-layout",
//   templateUrl: "./app-layout.component.html",
//   styleUrls: ["./app-layout.component.css"],
// })
// export class AppLayoutComponent implements OnInit, OnDestroy {
//   // collapsedHeight = '48px';
//   // expandedHeight = '64px';

//   // sideNavItemList: Subject<any>;
//   // _sideNavItemList: SideBarEle[] = [];

//   // _sideNavBottomItemList: SideBarEle[] = [];
//   // sideNavBottomItemList: Subject<any>;

//   _bottomNavList: SideBar[] = [
//     { id: "settings", pageTitle: "Settings", icon: "fas fa-cog", category: "Operations"},
//     { id: "contact-us", pageTitle: "Contact us", icon: "fas fa-paper-plane", category: "Operations" },
//     { id: "logout", pageTitle: "Logout", icon: "fas fa-sign-out-alt", category: "Operations" },
//   ];

//   /**
//    * navItemList array will contain all the buttons needed
//    * sidebarCategories will be an array of different categories that are rendered in the sidebar
//    */
//   navItemList: ReplaySubject<SideBar[]>;
//   sidebarCategories: ReplaySubject<string[]>;

//   siteNavList = [];
//   sideBarIndex: string;

//   site_id: number;
//   user_id: number;
//   userChanged = false;

//   dateBySiteId = {};

//   user_type: string;
//   navigationPath: string;
//   siteList: SiteItem[] = [];

//   generationList: AnalyticsAsset[] = [];
//   consumptionList: AnalyticsAsset[] = [];

//   deviceList = {};

//   where_performance = ["AC-Power"];

//   subSink: SubSink;

//   accessRights;
//   pageName = "appLayoutPage";

//   activeNavState: NavigationState;
//   navSubscription: Subscription;

//   constructor(
//     private cookie: CookieService,
//     private localStorage: LocalStorageService,
//     private http: HttpService,
//     private router: Router,
//     private msg: MessageService,
//     private globalService: GlobalService,
//     private dialog: MatDialog,
//     private theme: ThemeService
//   ) {}

//   ngOnInit() {
//     this.theme.setTheme();
//     this.subSink = new SubSink();
//     // this.sideNavItemList = new Subject();
//     // this.sideNavBottomItemList = new Subject();

//     this.navItemList = new ReplaySubject();
//     this.sidebarCategories = new ReplaySubject();

//     this.user_type = this.cookie.get(CookieKeys.user_type);

//     if (this.user_type == UserType.demo_user) {
//       this.navigationPath = UserType.user;
//     } else if (this.user_type == UserType.demo_site) {
//       this.navigationPath = UserType.site;
//     } else {
//       this.navigationPath = this.user_type;
//     }

//     // for site user always show second nav bar
//     // if (this.user_type == UserType.site) {
//     //   this.msg.enableSelectSite(0);
//     // }

//     // select all from sidebar
//     // this.subSink.sink = this.msg.sideBarSelection$
//     //   .subscribe((eleName: string) => {
//     //     if (eleName != '') {
//     //       console.log(eleName);
//     //       this.sideBarIndex = eleName;
//     //       this.cdRef.detectChanges();
//     //     }
//     //   });

//     this.user_id = parseInt(this.cookie.get(CookieKeys.user_id));

//     // dynamic navigation
//     // this.subSink.sink = this.msg.isEnableSelectSite$.subscribe(isEnable => {

//     //   // hide site
//     //   if (isEnable == 1) {
//     //     this.enableSiteList = true;
//     //   } else if (isEnable == 0) { // show site
//     //     this.enableSiteList = false;
//     //   }
//     //   this.cdRef.detectChanges();
//     // });

//     this.subSink.sink = this.router.events
//       .pipe(filter((event) => event instanceof NavigationEnd))
//       .subscribe((event: NavigationEnd) => {
//         this.funUpdateNavBar(event.url);
//       });

//     // show dashboard button to admin only
//     // if (this.user_type == UserType.admin) {
//     //   this.userCategory = true;
//     // } else {
//     //   this.userCategory = false;
//     // }

//     // get access write on refresh
//     if (typeof this.accessRights == "undefined" && this.site_id) {
//       this.funModifyAccess();
//     }

//     // bottom navigation
//     // this._sideNavBottomItemList = [
//     //   { id: 'settings', name: 'Settings', icon: 'fa-cog' },
//     //   { id: 'contact-us', name: 'Contact us', icon: 'fa-envelope' },
//     //   { id: 'logout', name: 'Logout', icon: 'fa-sign-out' }
//     // ];

//     // setTimeout(() => {
//     //   // create initial route
//     //   this.funUpdateNavBar(this.router.url);

//     //   this.sideNavBottomItemList.next(this._sideNavBottomItemList);
//     // });

//     this.funUpdateNavBar(this.router.url);
//   }

//   /**
//    * gets site_id
//    */
//   funGetSiteId() {
//     // check if site_id is available in local storage
//     let localStorage_site_id = this.localStorage.getItem(CookieKeys.site_id);

//     if (localStorage_site_id != null) {
//       this.site_id = parseInt(localStorage_site_id);
//     } else {
//       this.site_id = parseInt(this.cookie.get(CookieKeys.site_id));
//     }
//   }

//   funUpdateSideBarList(navList: SideBar[]) {
//     this.navItemList.next([...navList, ...this._bottomNavList]);
//   }

//   funUpdateSideBarCategories(categoryList: string[]) {
//     this.sidebarCategories.next(categoryList);
//   }
//   /**
//    * Updates navigation based on current route
//    */
//   funUpdateNavBar(routeString: string) {
//     if (routeString.includes("home")) {
//       const _sideNavItemList: SideBar[] = [
//         { id: "dashboard", pageTitle: "Dashboard", icon: "fas fa-columns", category: "Home" },
//       ];

//       // this.sideNavItemList.next(this._sideNavItemList);
//       this.funUpdateSideBarList(_sideNavItemList);
//       this.funUpdateSideBarCategories(['Home'])
//       this.activeNavState = NavigationState.homeState;
//     } else if (routeString.includes("landing-page")) {
//       this.funCreateLandingPageNavList();
//       this.activeNavState = NavigationState.landingState;
//     } else if (routeString.includes("tickets")) {
//       this.funCreateTicketsPageNavList();
//       this.activeNavState = NavigationState.ticketState;
//     } else if (routeString.includes("setting")) {
//       this.funCreateSettingsPageNavList();
//       this.activeNavState = NavigationState.settingState;
//     } else if (
//       routeString.includes("team-detail") ||
//       routeString.includes("maintenance") ||
//       routeString.includes("reports") ||
//       routeString.includes("chart-analysis") ||
//       routeString.includes("alarm")
//     ) {
//       this.funCreateDefaultPageNavList();
//       this.activeNavState = NavigationState.defaultState;
//     } else {
//       this.funGetSiteId();
//       this.funGetDeviceList(this.site_id);
//       this.activeNavState = NavigationState.dashboardState;
//     }
//   }

//   /**
//    * @function funModifyAccess()
//    * this function modifies access for section of a page
//    */
//   funModifyAccess() {
//     let param = {
//       user_id: this.user_id,
//       page_name: this.pageName,
//     };

//     if (
//       this.user_type == UserType.site ||
//       this.user_type == UserType.demo_site
//     ) {
//       param["site_id"] = this.site_id;
//     }

//     this.subSink.sink = this.http
//       .funGetAccessRight(param)
//       .subscribe((res: ApiResponseType<any>) => {
//         if (res.success) {
//           const data = res.data;

//           let modifiedAccessRights = {};

//           for (const aWrites of data) {
//             modifiedAccessRights[aWrites.feature_name] = {
//               status: aWrites.status,
//               due_date: aWrites.due_date,
//             };
//           }

//           this.accessRights = {};
//           let today = moment(new Date());

//           let removeWrites = [];

//           for (const aWrite of accessRight) {
//             // find current page from list
//             if (aWrite.page.pageName == this.pageName) {
//               for (const accessTags of aWrite.tags) {
//                 let tagKey = accessTags.tagName;
//                 let dueDate;

//                 // get access status for current user type
//                 let isAccessible = accessTags.access.find(
//                   (accessTag) => accessTag.userType == this.user_type
//                 );

//                 // check for tag key in database
//                 if (Object.keys(modifiedAccessRights).includes(tagKey)) {
//                   dueDate = moment(modifiedAccessRights[tagKey].due_date);

//                   // check if dueDate is not passed
//                   if (dueDate.diff(today, "days") > -1) {
//                     this.accessRights[tagKey] = !modifiedAccessRights[tagKey]
//                       .status;
//                   } else {
//                     // remove if date is past date
//                     removeWrites.push(tagKey);
//                     this.accessRights[tagKey] = isAccessible
//                       ? isAccessible.isAccessible
//                       : false;
//                   }
//                 } else {
//                   this.accessRights[tagKey] = isAccessible
//                     ? isAccessible.isAccessible
//                     : false;
//                 }
//               }
//             }
//           }

//           // remove outdated writes
//           if (removeWrites.length > 0) {
//             this.funRemoveAccessRight(removeWrites);
//           }
//         }
//       });
//   }

//   /**
//    * @function funRemoveAccessRight()
//    * this function will remove old access writes
//    * @param accessRightTags list of access write tag
//    */
//   funRemoveAccessRight(accessRightTags: Array<string>) {
//     let param = {
//       user_id: this.user_id,
//       page_name: this.pageName,
//       tag_list: accessRightTags.toString(),
//     };

//     this.subSink.sink = this.http.funRemoveAccessRight(param).subscribe(
//       (res: ApiResponseType<any>) => {
//         if (res.success) {
//           // console.log('access write record removed successfully');
//           console.log(res.message);
//         }
//       },
//       (error) => console.log(error.error)
//     );
//   }

//   /**
//    * @function funCreateLandingPageNavList()
//    * this function gets site detail
//    * this function is called at landing page
//    */
//   funCreateLandingPageNavList() {
//     if (this.activeNavState != NavigationState.landingState) {
//       this.user_id = parseInt(this.cookie.get(CookieKeys.user_id));

//       if (typeof this.user_id != "undefined") {
//         this.navSubscription && this.navSubscription.unsubscribe();

//         this.navSubscription = this.http
//           .funGetSiteList(this.user_id)
//           .subscribe((res: ApiResponseType<any>) => {
//             if (res.success) {
//               const siteDetailList = res.data;

//               this.siteList = [];
//               this.siteNavList = [];

//               if (siteDetailList.length > 0) {
//                 siteDetailList.forEach((item) => {
//                   let siteItem: SiteItem = {
//                     site_id: item.site_id,
//                     user_id: this.user_id,
//                     sitename: item.sitename,
//                     icon: "my_location"
//                   };

//                   this.siteList.push(siteItem);
//                   this.siteNavList.push({
//                     id: "site," + item.site_id,
//                     pageTitle: item.sitename,
//                     category: "Dashboard"
//                   });
//                 });

//                 // get site_id from only if user is not changed
//                 if (!this.userChanged) {
//                   this.userChanged = false;
//                 }

//                 this.msg.changeSiteId(this.site_id + "");
//               }

//               // const siteNav = this._sideNavItemList.find(nav => nav.id == 'sites');
//               let _sideNavItemList: SideBar[];

//               // add dashboard for admin only
//               if (this.user_type == UserType.admin) {
//                 _sideNavItemList = [
//                   {
//                     id: "dashboard",
//                     pageTitle: "Home",
//                     icon: "fas fa-columns",
//                     category: "Dashboard"
//                   },
//                 ];
//               } else {
//                 _sideNavItemList = [];
//               }

//               // update sidebar if site is not present
//               // if (typeof siteNav == 'undefined') {

//               _sideNavItemList.push({
//                 id: "sites",
//                 pageTitle: "Sites",
//                 icon: "fas fa-map-marker-alt",
//                 subMenu: this.siteNavList,
//                 category: "Dashboard"
//               });

//               // show tickets to admin and customer only
//               // hide for v-flow user
//               if (this.user_type != "site" && this.user_id != 108) {
//                 _sideNavItemList.push({
//                   id: "detail-reports",
//                   pageTitle: "Reports",
//                   icon: "fas fa-file",
//                   addSeparator: true,
//                   category: "Operations"
//                 });
//                 _sideNavItemList.push({
//                   id: "tickets",
//                   pageTitle: "Tickets",
//                   icon: "fas fa-ticket-alt",
//                   category: "Operations"
//                 });
//                 _sideNavItemList.push({
//                   id: "team-detail",
//                   pageTitle: "Team Detail",
//                   icon: "fas fa-users",
//                   category: "Operations"
//                 });
//                 _sideNavItemList.push({
//                   id: "maintenance-detail",
//                   pageTitle: "Maintenance",
//                   icon: "fas fa-cogs",
//                   category: "Operations"
//                 });
//               }

//               // add above chart-analysis
//               // hide for v-flow user
//               if (this.user_type == UserType.admin && this.user_id != 108) {
//                 _sideNavItemList.push({
//                   id: "alarm",
//                   pageTitle: "Alarm Detail",
//                   icon: "fas fa-bell",
//                   category: "Operations"
//                 });
//               }

//               // hide for v-flow user
//               if (this.user_type != UserType.site && this.user_id != 108) {
//                 _sideNavItemList.push({
//                   id: "chart-analysis",
//                   pageTitle: "Chart Analysis",
//                   icon: "fas fa-chart-bar",
//                   category: "Operations"
//                 });
//               }

//               // this.sideNavItemList.next(this._sideNavItemList);
//               this.funUpdateSideBarList(_sideNavItemList);
//               this.funUpdateSideBarCategories(['Dashboard', 'Operations'])
//             }
//           });

//         this.subSink.sink = this.navSubscription;
//       }
//     }
//   }

//   /**
//    * get device list of all sites for selected user
//    */
//   private funGetDeviceList(site_id: number) {
//     if (this.activeNavState != NavigationState.dashboardState) {
//       const param = {
//         user_id: this.user_id,
//         site_id: site_id,
//         performance_type: this.where_performance.toString(),
//       };

//       this.navSubscription && this.navSubscription.unsubscribe();

//       // TODO: currently not using utc time for forecast nav-link validation
//       const today_date = moment().set({ hours: 0, minutes: 0, seconds: 0 });
//       const start_date = today_date.format("YYYY-MM-DD HH:mm:ss");
//       today_date.add(1, "days");
//       const end_date = today_date.format("YYYY-MM-DD HH:mm:ss");

//       const params = {
//         start_date,
//         end_date,
//         user_id: this.user_id,
//         site_id: this.site_id,
//         // asset_type: 'Load'
//       };

//       // for demo user skip forecast count API call (add dummy forecast data)
//       const zipObservable =
//         (this.user_type == UserType.demo_site || this.user_type == UserType.demo_user)
//           ? zip(
//             this.http.funGetDeviceList(param),
//             of<ApiResponseType<ForecastDataCountRes>>({ success: true, message: '', data: { count: 1 } }),
//             of<ApiResponseType<ForecastDataCountRes>>({ success: true, message: '', data: { count: 1 } }),
//           )
//           : zip(
//             this.http.funGetDeviceList(param),
//             this.http.funForecastDataCount({ ...params, asset_type: 'Solar' }),
//             this.http.funForecastDataCount({ ...params, asset_type: 'Load' })
//           );

//       this.navSubscription = zipObservable.subscribe((res: ApiResponseType<any>[]) => {

//         const [deviceRes, solarForecastCountRes, loadForecastCountRes] = res;

//         if (deviceRes.success) {
//           const deviceList = deviceRes.data;

//           const filteredDeviceList = deviceList.map(
//             (device) => device.device_name
//           );

//           // let index = filteredDeviceList.includes('Load');
//           // if (index && index <= 0) {
//           //   filteredDeviceList.splice(index, 1);
//           //   filteredDeviceList.push('Load');
//           // }

//           let assetDetailList: AnalyticsAsset[] = this.funCreateDeviceList(
//             filteredDeviceList
//           );

//           this.generationList = [];
//           this.consumptionList = [];

//           for (const device of assetDetailList) {
//             if (generationList.includes(device.assetName))
//               this.generationList.push(device);
//             if (
//               consumptionList.includes(device.assetName) ||
//               device.assetName == "load"
//             )
//               this.consumptionList.push(device);
//           }

//           if (solarForecastCountRes.success && loadForecastCountRes.success) {
//             this.funCreateDashboardNav(
//               solarForecastCountRes.data["count"],
//               loadForecastCountRes.data["count"]
//             );
//           } else {
//             this.funCreateDashboardNav(0, 0);
//             console.log("solar/load forecast count not found");
//           }
//         }
//       });
//     }
//   }

//   /**
//    * create navigation for ticket's page
//    */
//   funCreateTicketsPageNavList() {
//     // this._sideNavItemList = [
//     //   { id: 'back_to_dashboard', name: 'Dashboard', icon: 'fa-chevron-left' },
//     //   { id: 'all_tickets', name: 'All Tickets', badgeName: '0' },
//     //   { id: 'opened', name: 'Opened', badgeName: '0' },
//     //   { id: 'closed', name: 'Closed', badgeName: '0' },
//     //   { id: 'priority', name: 'Priority', badgeName: '0' },
//     //   { id: 'heading', name: 'CATEGORY', isHeading: true },
//     //   { id: 'category_general', name: 'General' },
//     //   { id: 'category_operations', name: 'Operations' },
//     //   { id: 'category_maintenance', name: 'Maintenance' },
//     //   { id: 'category_billing', name: 'Billing' },
//     //   { id: 'category_customer_support', name: 'Customer Support' }
//     // ];
//     // this.sideNavItemList.next(this._sideNavItemList);

//     const _sideNavItemList = [
//       {
//         id: "back_to_dashboard",
//         pageTitle: "Dashboard",
//         icon: "fas fa-chevron-left",
//         category: "Dashboard"
//       },
//       { id: "all_tickets", pageTitle: "All Tickets", badgeName: "0", category: "Operations" },
//       { id: "opened", pageTitle: "Opened", badgeName: "0", category: "Operations" },
//       { id: "closed", pageTitle: "Closed", badgeName: "0", category: "Operations" },
//       { id: "priority", pageTitle: "Priority", badgeName: "0", category: "Operations" },
//       { id: "heading", pageTitle: "CATEGORY", isHeading: true, category: "Operations" },
//       { id: "category_general", pageTitle: "General", category: "Operations" },
//       { id: "category_operations", pageTitle: "Operations", category: "Operations" },
//       { id: "category_maintenance", pageTitle: "Maintenance", category: "Operations" },
//       { id: "category_billing", pageTitle: "Billing", category: "Operations" },
//       { id: "category_customer_support", pageTitle: "Customer Support", category: "Operations" },
//     ];

//     this.funUpdateSideBarList(_sideNavItemList);
//     this.funUpdateSideBarCategories(['Tickets'])
//   }

//   funGetDashboard() {
//     let dashboardEle: SideBar;

//     if (this.user_type == UserType.admin) {
//       dashboardEle = {
//         id: "admin_dashboard",
//         pageTitle: "Dashboard",
//         icon: "fas fa-chevron-left",
//         category: "Dashboard"
//       };
//     } else if (
//       this.user_type == UserType.user ||
//       this.user_type == UserType.demo_user
//     ) {
//       dashboardEle = {
//         id: "user_dashboard",
//         pageTitle: "Dashboard",
//         icon: "fas fa-chevron-left",
//         category: "Dashboard"
//       };
//     } else {
//       dashboardEle = {
//         id: "site_dashboard",
//         pageTitle: "Dashboard",
//         icon: "fas fa-chevron-left",
//         category: "Dashboard"
//       };
//     }

//     return dashboardEle;
//   }

//   /**
//    * create navigation with only dashboard link for all users
//    */
//   funCreateDefaultPageNavList() {
//     // let _sideNavItemList: SideBar;

//     // if (this.user_type == UserType.admin) {
//     //   _sideNavItemList = { id: 'admin_dashboard', pageTitle: 'Dashboard', icon: 'fas fa-chevron-left' };
//     // } else if (this.user_type == UserType.user) {
//     //   _sideNavItemList = { id: 'user_dashboard', pageTitle: 'Dashboard', icon: 'fas fa-chevron-left' };
//     // } else {
//     //   _sideNavItemList = { id: 'site_dashboard', pageTitle: 'Dashboard', icon: 'fas fa-chevron-left' };
//     // }

//     // this.sideNavItemList.next(this._sideNavItemList);
//     this.funUpdateSideBarList([this.funGetDashboard()]);
//     this.funUpdateSideBarCategories(['Dashboard'])
//   }

//   /**
//    * create navigation for settings page
//    */
//   funCreateSettingsPageNavList() {
//     let _sideNavItemList: SideBar[] = [];
//     //   this.funGetDashboard(),
//     //   { id: 'users', pageTitle: 'Users', icon: 'far fa-user' },
//     //   { id: 'site', pageTitle: 'Sites', icon: 'fas fa-map-marked-alt' },
//     //   { id: 'device', pageTitle: 'Resync Device', icon: 'fas fa-bolt' },
//     //   { id: 'asset', pageTitle: 'Asset', icon: 'far fa-sun' },
//     //   { id: 'access', pageTitle: 'Access', icon: 'fas fa-shield-alt' },
//     // ];

//     switch (this.user_type) {
//       case UserType.admin:
//         _sideNavItemList = [
//           this.funGetDashboard(),
//           { id: "users", pageTitle: "Users", icon: "far fa-user", category: "Operations" },
//           { id: "site", pageTitle: "Sites", icon: "fas fa-map-marked-alt", category: "Operations" },
//           { id: "device", pageTitle: "Resync Device", icon: "fas fa-bolt", category: "Operations" },
//           { id: "asset", pageTitle: "Energy Asset", icon: "far fa-sun", category: "Operations" },
//           {
//             id: "access",
//             pageTitle: "Access Rights",
//             icon: "fas fa-shield-alt",
//             category: "Operations"
//           },
//           { id: "alert", pageTitle: "Alert", icon: "far fa-bell", category: "Operations" },
//         ];
//         break;

//       case UserType.user:
//       case UserType.demo_user:
//         _sideNavItemList = [
//           this.funGetDashboard(),
//           {
//             id: "user_profile",
//             pageTitle: "Profile",
//             icon: "fas fa-user-edit", category: "Operations"
//           },
//           { id: "users", pageTitle: "Site Users", icon: "fas fa-user", category: "Operations" },
//           { id: "site", pageTitle: "Sites", icon: "fas fa-map-marked-alt", category: "Operations" },
//           { id: "asset", pageTitle: "Energy Asset", icon: "fas fa-sun" , category: "Operations"},
//           {
//             id: "user_change_password",
//             pageTitle: "Change Password",
//             icon: "fas fa-key", category: "Operations"
//           },
//           {
//             id: "access",
//             pageTitle: "Access Rights",
//             icon: "fas fa-shield-alt", category: "Operations"
//           },
//           { id: "alert", pageTitle: "Alert", icon: "far fa-bell", category: "Operations" },
//         ];
//         break;

//       case UserType.site:
//       case UserType.demo_site:
//         _sideNavItemList = [
//           this.funGetDashboard(),
//           {
//             id: "site_profile",
//             pageTitle: "Profile",
//             icon: "fas fa-user-edit", category: "Operations"
//           },
//           {
//             id: "site_change_password",
//             pageTitle: "Change Password",
//             icon: "fas fa-key", category: "Operations"
//           },
//         ];
//         break;
//     }

//     this.funUpdateSideBarList(_sideNavItemList);
//     this.funUpdateSideBarCategories(['Settings'])
//   }

//   /**
//    * @function funSetDeviceList()
//    * this function takes device list of particular site
//    * and sets its title and icon image and navigation url
//    * @param deviceList list of device of selected site
//    * @returns list with extra details
//    */
//   funCreateDeviceList(deviceList): AnalyticsAsset[] {
//     let output: AnalyticsAsset[] = [];

//     for (const device of deviceList) {
//       switch (device) {
//         case "Solar":
//           output.push({
//             id: "solar",
//             assetName: "Solar",
//             display: "Solar Power",
//             link: "/dashboard/" + this.navigationPath + "/solar",
//           });
//           break;

//         case "Battery":
//           output.push({
//             id: "battery",
//             assetName: "Battery",
//             display: "Battery",
//             link: "/dashboard/" + this.navigationPath + "/battery",
//           });
//           break;

//         case "Diesel Generator":
//           output.push({
//             id: "dg",
//             assetName: "Diesel Generator",
//             display: "GenSet",
//             link: "/dashboard/" + this.navigationPath + "/dg",
//           });
//           break;

//         case "EV":
//           output.push({
//             id: "ev",
//             assetName: "EV",
//             display: "EV",
//             link: "/dashboard/" + this.navigationPath + "/ev",
//           });
//           break;

//         case "Grid":
//           output.push({
//             id: "grid",
//             assetName: "Grid",
//             display: "Energy Grid",
//             link: "/dashboard/" + this.navigationPath + "/grid",
//           });
//           break;

//         case "Wind":
//           output.push({
//             id: "wind",
//             assetName: "Wind",
//             display: "Wind Power",
//             link: "/dashboard/" + this.navigationPath + "/wind",
//           });
//           break;

//         case "Light":
//           output.push({
//             id: "light",
//             assetName: "Light",
//             display: "Light",
//             link: "/dashboard/" + this.navigationPath + "/light",
//           });
//           break;

//         case "Load":
//           output.push({
//             id: "load",
//             assetName: "load",
//             display: "Load",
//             link: "/dashboard/" + this.navigationPath + "/load",
//           });
//           break;

//         case "Lift":
//           output.push({
//             id: "lift",
//             assetName: "Lift",
//             display: "Lift",
//             link: "/dashboard/" + this.navigationPath + "/lift",
//           });
//           break;

//         case "Hvac":
//           output.push({
//             id: "hvac",
//             assetName: "Hvac",
//             display: "Hvac",
//             link: "/dashboard/" + this.navigationPath + "/hvac",
//           });
//           break;
//       }
//     }

//     return output;
//   }

//   /**
//    * creates navigation for dashboard
//    */
//   funCreateDashboardNav(solarForecastCount: number, loadForecastCount: number) {
//     let currentSite:SiteItem = this.siteList.find(x => x.site_id == this.site_id)
//     let _sideNavItemList: SideBar[] = [];

//     // hide all sites navigation for site user
//     if (
//       this.user_type == UserType.site ||
//       this.user_type == UserType.demo_site
//     ) {
//       _sideNavItemList = [];
//     } else {
//       _sideNavItemList = [
//         // {
//         //   id: "all-sites",
//         //   pageTitle: "All Sites",
//         //   icon: "fas fa-chevron-left",
//         //   category: "Dashboard"
//         // },
//       ];
//     }
//     // let analyticsNav = { id: 'analytics', name: 'Analytics', icon: 'fa-bar-chart', subMenu: [] };
//     _sideNavItemList.push({
//       id: "dashboard",
//       pageTitle: "Home",
//       icon: "fas fa-columns",
//       category: "Dashboard"
//     },
    
//     {
//       id: "sites",
//       pageTitle: "Sites",
//       icon: "fas fa-map-marker-alt",
//       subMenu: this.siteNavList,
//       category: "Dashboard"
//     },
//     {
//       id: "all",
//       pageTitle: "Site Dashboard",
//       icon: "fas fa-th-large",
//       category: "Dashboard"
//     });
//     _sideNavItemList.push({
//       id: "tv-overview",
//       pageTitle: "TV Overview",
//       icon: "fas fa-th-large",
//       category: "Dashboard"
//     });
//     // _sideNavItemList.push({
//     //   id: "documents",
//     //   pageTitle: "Documents",
//     //   icon: "far fa-file-alt",
//     // });

//     let genNav = [];
//     let conNav = [];

//     this.generationList.forEach((generation) => {
//       genNav.push({
//         id: generation.id,
//         pageLink: generation.display,
//         pageTitle: generation.display,
//         parentId: "generation",
//         category: "Dashboard"
//       });
//     });

//     this.consumptionList.forEach((generation) => {
//       conNav.push({
//         id: generation.id,
//         pageLink: generation.display,
//         pageTitle: generation.display,
//         parentId: "consumption",
//         category: "Dashboard"
//       });
//     });

//     if (genNav.length > 0) {
//       _sideNavItemList.push({
//         id: "generation",
//         pageTitle: "Generation",
//         icon: "fas fa-atom",
//         subMenu: genNav,
//         category: "Dashboard"
//       });
//     }

//     if (conNav.length > 0) {
//       _sideNavItemList.push({
//         id: "consumption",
//         pageTitle: "Consumption",
//         icon: "fas fa-bolt",
//         subMenu: conNav,
//         category: "Dashboard"
//       });
//     }

//     // this._sideNavItemList.push(analyticsNav);
//     // this._sideNavItemList.push({ id: 'detail-reports', name: 'Detail Reports', icon: 'fa-file' });

//     // _sideNavItemList.push({
//     //   id: 'generation',
//     //   pageTitle: 'Generation',
//     //   icon: 'fas fa-atom',
//     //   subMenu: genNav
//     // });

//     // this.generationList.forEach(generation => {
//     //   genNav.push({ id: generation.id, pageLink: generation.display, pageTitle: generation.display, parentId: 'generation' });
//     // });

//     let forecastNav = [];

//     const genList = this.generationList.map((g) => g.id);
//     const conList = this.consumptionList.map((g) => g.id);

//     // show solar only if site have solar asset
//     // and today solar forecast data is available
//     if (genList.includes("solar") && solarForecastCount > 0) {
//       // // hide forecast for site: resyncdemo, loola
//       // // hide for v-flow user
//       // if (!(this.site_id == 13 || this.site_id == 106) && this.user_id != 108) {
//       // _sideNavItemList.push({ id: 'forecast', pageTitle: 'Forecast', icon: 'fas fa-chart-area' });
//       forecastNav.push({ id: "forecast-solar", pageTitle: "Solar", category: "Dashboard" });
//       // }
//     }

//     // show solar only if site have load asset
//     // and today load forecast data is available
//     if (conList.includes("load") && loadForecastCount > 0) {
//       forecastNav.push({ id: "forecast-load", pageTitle: "Load", category: "Dashboard" });
//     }

//     // create forecast sidebar if sub menu is not empty
//     if (forecastNav.length > 0) {
//       _sideNavItemList.push({
//         id: "forecast",
//         pageTitle: "Forecast",
//         icon: "fas fa-chart-area",
//         subMenu: forecastNav,
//         category: "Dashboard"
//       });
//     }

//     // show tickets to admin and customer only
//     // hide for v-flow user
//     if (this.user_type != "site" && this.user_id != 108) {
//       _sideNavItemList.push({
//         id: "tickets",
//         pageTitle: "Tickets",
//         icon: "fas fa-ticket-alt",
//         category: "Operations"
//       });
//       _sideNavItemList.push({
//         id: "team-detail",
//         pageTitle: "Team Detail",
//         icon: "fas fa-users",
//         category: "Operations"
//       });
//       _sideNavItemList.push({
//         id: "maintenance-detail",
//         pageTitle: "Maintenance Detail",
//         icon: "fas fa-cogs",
//         category: "Operations"
//       });
//     }

//     // this.sideNavItemList.next(this._sideNavItemList);
//     this.funUpdateSideBarList(_sideNavItemList);
//   }

//   /**
//    * navigation item clicked
//    * @param {string} id id for navigation
//    */
//   navItemClicked(id: string) {
//     if (id == "dashboard") {
//       this.router.navigateByUrl("/dashboard/landing-page");
//       this.removeTheme();
//     } else if (id == "all-sites") {
//       this.router.navigateByUrl("/dashboard/landing-page");
//     } else if (id == "detail-reports") {
//       this.router.navigateByUrl("/dashboard/reports");
//       // } else if (id == 'forecast') {

//       //   this.router.navigateByUrl('/dashboard/forecast');
//     } else if (id == "forecast-solar") {
//       this.router.navigateByUrl("/dashboard/forecast/solar");
//     } else if (id == "forecast-load") {
//       this.router.navigateByUrl("/dashboard/forecast/load");
//     } else if (id == "tickets") {
//       this.router.navigateByUrl("/dashboard/tickets");
//     } else if (id == "maintenance-detail") {
//       this.router.navigateByUrl("/dashboard/maintenance");
//     } else if (id == "chart-analysis") {
//       this.router.navigateByUrl("/dashboard/chart-analysis");
//     } else if (id == "alarm") {
//       this.router.navigateByUrl("/dashboard/alarm");
//     } else if (id == "all") {
//       this.router.navigateByUrl("/dashboard/" + this.navigationPath);
//     } else if (id == "tv-overview") {
//       this.router.navigateByUrl("/dashboard/tv-overview");
//     } else if (id == "documents") {
//       this.router.navigateByUrl("/dashboard/documents");
//     } else if (id == "user_dashboard" || id == "admin_dashboard") {
//       this.router.navigateByUrl("/dashboard/landing-page");
//     } else if (id == "site_dashboard") {
//       this.router.navigateByUrl("/dashboard/" + this.navigationPath);
//     } else if (id == "settings") {
//       this.router.navigateByUrl("settings");
//     } else if (id == "users") {
//       let param: string;

//       if (this.user_type == UserType.admin) {
//         param = this.globalService.encrypt_string("admin");
//       } else if (
//         this.user_type == UserType.user ||
//         this.user_type == UserType.demo_user
//       ) {
//         param = this.globalService.encrypt_string(this.user_id + "");
//       }

//       this.router.navigateByUrl(`settings/users/${param}`);
//     } else if (id == "site") {
//       let param: string;

//       if (this.user_type == UserType.admin) {
//         param = this.globalService.encrypt_string("admin");
//       } else if (
//         this.user_type == UserType.user ||
//         this.user_type == UserType.demo_user
//       ) {
//         param = this.globalService.encrypt_string(this.user_id + "");
//       }

//       this.router.navigateByUrl(`settings/site/${param}`);
//     } else if (id == "device") {
//       let param: string;

//       if (this.user_type == UserType.admin) {
//         param = this.globalService.encrypt_string("admin");
//       } else if (
//         this.user_type == UserType.user ||
//         this.user_type == UserType.demo_user
//       ) {
//         param = this.globalService.encrypt_string(this.user_id + "");
//       }

//       this.router.navigateByUrl(`settings/device/${param}`);
//     } else if (id == "asset") {
//       let param: string;

//       if (this.user_type == UserType.admin) {
//         param = this.globalService.encrypt_string("admin");
//       } else if (
//         this.user_type == UserType.user ||
//         this.user_type == UserType.demo_user
//       ) {
//         param = this.globalService.encrypt_string(this.user_id + "");
//       }

//       this.router.navigateByUrl(`settings/asset/${param}`);
//     } else if (id == "user_profile") {
//       const param = this.globalService.encrypt_string(`view^^${this.user_id}`);
//       this.router.navigateByUrl(`settings/user-info/${param}`);
//     } else if (id == "user_change_password") {
//       const param = this.globalService.encrypt_string(this.user_id + "");
//       this.router.navigateByUrl(`settings/change-pwd/${param}`);
//     } else if (id == "access" || id == "alert") {
//       this.router.navigateByUrl("settings/coming-soon");
//     } else if (id == "contact-us") {
//       this.dialog.open(FormModalComponent, { width: "500px" });
//     } else if (id == "logout") {
//       this.cookie.deleteAll();
//       this.router.navigateByUrl("/");
//     } else if (id == "back_to_dashboard") {
//       this.router.navigateByUrl("/dashboard/landing-page");
//     } else if (
//       id == "all_tickets" ||
//       id == "opened" ||
//       id == "closed" ||
//       id == "priority" ||
//       id == "category_general" ||
//       id == "category_operations" ||
//       id == "category_maintenance" ||
//       id == "category_billing" ||
//       id == "category_customer_support"
//     ) {
//       this.msg.setNewFilter(id);
//     } else if (id.includes("site")) {
//       const site_id = id.replace("site,", "");
//       const selectedSite = this.siteList.filter(
//         (site) => site.site_id + "" == site_id
//       );

//       if (selectedSite.length > 0) {
//         // change site_id in cookie and localStorage
//         this.cookie.set(CookieKeys.site_id, site_id + "");
//         this.localStorage.setItem(CookieKeys.site_id, site_id);

//         // change site_timezone in cookie
//         this.cookie.set(
//           CookieKeys.site_timezone,
//           this.dateBySiteId[site_id] + ""
//         );
//         this.router.navigateByUrl("/dashboard/" + this.navigationPath);
//       }
//     } else if (id == "team-detail") {
//       this.router.navigateByUrl("/dashboard/team-detail");
//     } else {
//       // for generation or consumption
//       // skip consumption asset navigation
//       if (!(id == "Lift" || id == "Hvac" || id == "Light")) {
//         const generation: AnalyticsAsset = this.generationList.find(
//           (gen) => gen.id == id
//         );

//         if (generation) {
//           this.funUpdateSideBarCategories(["Dashboard", "Generation Asset Analysis", "Operations"])
//           this.router.navigateByUrl(generation.link);
//         } else {
//           const consumption = this.consumptionList.find((con) => con.id == id);
//           if (consumption) {
//             this.funUpdateSideBarCategories(["Dashboard", "Consumption Asset Analysis", "Operations"])  
//             this.router.navigateByUrl(consumption.link);
//           }
//         }
//       }
//     }
//   }

//   /**
//    * logo click event
//    */
//   funLogoClicked() {
//     if (
//       this.user_type == UserType.user ||
//       this.user_type == UserType.demo_user
//     ) {
//       this.router.navigate(["dashboard/landing-page"]);
//     } else if (
//       this.user_type == UserType.site ||
//       this.user_type == UserType.demo_site
//     ) {
//       this.router.navigate(["dashboard/" + this.navigationPath]);
//     } else {
//       this.router.navigate(["dashboard/home"]);
//     }
//   }

//   /**
//    * scroll to top in every navigation
//    */
//   onActivate() {
//     window.scroll(0, 0);
//   }

//   removeTheme() {
//     this.theme.removeTheme()
//   }

//   ngOnDestroy() {
//     // this.navSubscription && this.navSubscription.unsubscribe();
//     if (this.subSink) this.subSink.unsubscribe();
//   }
// }

// class AnalyticsAsset {
//   id: string;
//   assetName: string;
//   link: string;
//   icon?: string;
//   display?: string;
// }

// class SiteItem {
//   site_id: number;
//   user_id: number;
//   sitename: string;
//   icon: string;
// }

// enum NavigationState {
//   homeState = "homeState",
//   landingState = "landingState",
//   dashboardState = "dashboardState",
//   ticketState = "ticketState",
//   settingState = "settingState",
//   defaultState = "defaultState",
// }
