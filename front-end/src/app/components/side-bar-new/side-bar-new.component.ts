import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { MessageService } from "src/app/services/message.service";
import { SideBar } from "src/app/types/common.type";
import { SubSink } from "subsink";
import { JoyrideService } from 'ngx-joyride';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys, UserType } from 'src/app/common/enum';
/**
 *  TODO: check for window width, remove settings, message and logout buttons
 */
@Component({
    selector: "app-side-bar-new",
    templateUrl: "./side-bar-new.component.html",
    styleUrls: ["./side-bar-new.component.scss"],
})

export class SideBarNewComponent implements OnInit, OnDestroy {
    @Output() sidebarItemClicked = new EventEmitter<string>();
    @Input() categoryList: Observable<string[]>;
    @Input() navItemList: Observable<SideBar[]>;

    // list of items to render
    sidebarItems: SideBar[] = [];

    expandSidebar = true;
    showOperationsHeader = false;
    noSideBar = false;
    // showOverlay = false;
    selectedItemIndex = "";
    selectedSubItemIndex = "";
    subMenuExpand = "";
    mobileView = false;
    subSink = new SubSink();

    navSubscription;

    sidebarWithTimeout;

    categories = [];

    titleJoy: string;
    textJoy: string;

    user_name: string;
    user_email: string;
    user_img: string;

    constructor(
        private readonly joyrideService: JoyrideService,
        private msg: MessageService, private router: Router,
        private cookie: CookieService
    ) {}

    ngOnInit() {
        this.subSink.sink = this.msg.getSidebarIndex$.subscribe(
            (neWIndex) => (this.selectedItemIndex = neWIndex)
        );

        this.user_name = this.cookie.get('user-name');
        this.user_email = this.cookie.get('user-email');
        this.user_img = this.cookie.get('user-img');

        console.log(`got name from cookie ${this.user_name}`);

        this.subSink.sink = this.navItemList.subscribe((navList) => {
            if (navList && navList.length > 0) {
                this.sidebarItems = navList;

                const user_type = 'user';

            }
        });
        this.subSink.sink = this.categoryList.subscribe((catList) => {
            if (catList && catList.length > 0) this.categories = catList;
        });
        this.mobileView = window.innerWidth < 800;
        this.onResize();

        this.navSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.onResize();
            }
        });
        this.sideBarResized();
    }

    /**
     * Handles sidebar clicked,
     * emits event back to app-layout-component
     *
     */
    sidebarClicked(navLink: SideBar) {
        // expand sidebar
        this.expandSidebar = true;

        // if sub menu (nested) items are available
        if (navLink.subMenu && navLink.subMenu.length > 0) {
            // if sub menu is already expanded, close it
            if (this.subMenuExpand == navLink.id) {
                this.subMenuExpand = "";
                this.categories.forEach((cat) => {
                    if (cat.id != navLink.category) cat.expanded = true;
                });
            } else {
                // expand sub menu
                this.categories.forEach((cat) => {
                    if (cat.id != navLink.category) cat.expanded = false;
                });
                this.subMenuExpand = navLink.id;
                this.selectedSubItemIndex = navLink.id;
            }
        } else {
            // if item is not submenu
            if (!navLink.isSubMenuItem) {
                // collapse any sub menus that are open
                // this.categories[index].expand = true;
                this.subMenuExpand = "";
                this.selectedSubItemIndex = "";
            } else {
                // highlight selected sub menu container
                this.selectedSubItemIndex = navLink.parentId;
            }

            this.selectedItemIndex = navLink.id;

            if (window.innerWidth < 800) {
                this.sideBarToggle();
            }
        }
        // finally emit navlink id to navigate to
        this.sidebarItemClicked.emit(navLink.id);
    }

    /**
     * Collapse / expand sidebar
     */
    sideBarToggle() {
        this.expandSidebar = !this.expandSidebar;
        this.msg.changeSidebarWidth(this.expandSidebar);
        // if (window.innerWidth < 800) {
        //   this.showOverlay = !this.showOverlay;
        // }
    }

    /**
     * Listen for changes in window width,
     * collaspe sidebar if mobile view
     */
    onResize() {
        if (this.router.url === "/dashboard/home") {
            if (window.innerWidth < 800) {
                this.showOperationsHeader = true;
                this.noSideBar = false;
            } else {
                this.showOperationsHeader = false;
                this.noSideBar = true;
            }
        } else {
            this.showOperationsHeader = true;
            this.noSideBar = false;
        }
        if (window.innerWidth < 800) {
            this.expandSidebar = false;
            this.mobileView = true;
            // this.showOverlay = false;
        } else if (window.innerWidth >= 800) {
            this.expandSidebar = true;
            this.mobileView = false;
        }
    }

    /**
     * Sends message after sidebar animation has changed
     * Clears previous timeout,
     * Sends event after sidebar animation is completed
     */
    sideBarResized() {
        if (this.sidebarWithTimeout) clearTimeout(this.sidebarWithTimeout);

        this.sidebarWithTimeout = setTimeout(() => {
            this.msg.changeSidebarWidth();
        }, 700);
    }

    /**
     * Toggle Expand the entire category
     */
    toggleHeader(header) {
        let index = -1;
        index = this.categories.findIndex((x) => x.id === header.id);
        if (this.categories[index].expanded) {
            this.subMenuExpand = "";
        }
        if (index > -1) {
            this.categories[index].expanded = !this.categories[index].expanded;
        }
    }

    trackById(index, item) {
        return item.id;
    }

    trackByIdAndExpanded(index, item) {
        return (item.id, item.expanded)
    }

    startTour(pageTitle) {
        console.log('WAHTS THE PAGETITLe', pageTitle);
        if (pageTitle === 'Tickets') {
            this.startTicketsTour();
        } else if (pageTitle === 'Uploaded Files') {
            this.startUploadFilesTour();
        }

        
    }

    startTicketsTour() {
        this.router.navigateByUrl('dashboard/tickets');
        this.titleJoy = "Tickets Tour";
        this.textJoy = "Hi, Welcome to Tickets tour"
        const options = {
            steps: [
                'firstStep',
                'step2@dashboard/tickets',
                'step11@dashboard/tickets',
                'step3@dashboard/tickets',
                'stepAddTicket@dashboard/add-tickets',
                'step4@dashboard/tickets',
                'step5@dashboard/tickets',
                'step6@dashboard/tickets',
                'step7@dashboard/tickets',
                'step10@dashboard/tickets',
                'step8@dashboard/tickets',
                'step9@dashboard/tickets',
            ],
            // startWith: 'step3@app',
            // waitingTime: 3000,
            stepDefaultPosition: 'top',
            themeColor: '#345632',
            showPrevButton: true,
            logsEnabled: true
            // customTexts: { prev: of('<<').pipe(delay(2000)), next: '>>'}
        };
        setTimeout(() => {
            this.joyrideService.startTour(options).subscribe(
                step => {
                    console.log('Next:', step);
                },
                e => {
                    console.log('Error', e);
                },
                () => {
                    // this.stepDone();
                    console.log('Tour finished');
                }
            );
        }, 1000);
    }

    startUploadFilesTour() {
        this.router.navigateByUrl('dashboard/documents');
        this.titleJoy = "Document Drive Tour";
        this.textJoy = "Hi, Welcome to Documents drive tour."
        const options = {
            steps: [
                'firstStepDoc',
                'secondStepDoc',
                'thirdStepDoc',
                'fourthStepDoc',
                'fifthStepDoc',
                'sixthStepDoc',
                'seventhStepDoc',
                'eighthStepDoc',
                'ninethStepDoc',
                'tenthStepDoc',
                'eleventhStepDoc',
                'twelvethStepDoc'
            ],
            // startWith: 'step3@app',
            // waitingTime: 3000,
            stepDefaultPosition: 'top',
            themeColor: '#345632',
            showPrevButton: true,
            logsEnabled: true
            // customTexts: { prev: of('<<').pipe(delay(2000)), next: '>>'}
        };
        setTimeout(() => {
            this.joyrideService.startTour(options).subscribe(
                step => {
                    console.log('Next:', step);
                },
                e => {
                    console.log('Error', e);
                },
                () => {
                    // this.stepDone();
                    console.log('Tour finished');
                }
            );
        }, 1000);
    }

    ngOnDestroy() {
        this.subSink.unsubscribe();
        this.navSubscription && this.navSubscription.unsubscribe();
    }
}
