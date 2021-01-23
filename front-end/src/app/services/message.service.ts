import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, zip } from "rxjs";
import { StringKeyValuePair } from "../types/common.type";

@Injectable({
    providedIn: "root",
})
export class MessageService {
    private siteIdList = new BehaviorSubject<string>("");
    private userIdChanged = new BehaviorSubject<number>(-1);
    private energyAssetChanged = new BehaviorSubject<string>("");
    private refreshChart = new BehaviorSubject<boolean>(false);

    private selectSite = new BehaviorSubject<number>(-1);
    private sidebarElementName = new BehaviorSubject<string>("");

    // tickets badge
    private sidebarBadge = new BehaviorSubject<StringKeyValuePair>({
        key: "",
        value: "",
    });
    private ticketFilter = new BehaviorSubject<string>("");

    // new side bar
    private sidebarIndexSub = new BehaviorSubject<string>("");
    private sidebarWidth = new BehaviorSubject<boolean>(true);

    // HeatMap status
    private stringOne = new Subject<boolean>();
    private stringTwo = new Subject<boolean>();
    private mttpOne = new Subject<boolean>();
    private mttpTwo = new Subject<boolean>();
    private renderHeatMap = new BehaviorSubject<boolean>(true);

    public get siteIdList$(): Observable<string> {
        return this.siteIdList.asObservable();
    }

    public get userIdChanged$(): Observable<number> {
        return this.userIdChanged.asObservable();
    }

    public get energyAssetChanged$(): Observable<string> {
        return this.energyAssetChanged.asObservable();
    }

    public get refreshChart$(): Observable<boolean> {
        return this.refreshChart.asObservable();
    }

    public get isEnableSelectSite$(): Observable<number> {
        return this.selectSite.asObservable();
    }

    public get sideBarSelection$(): Observable<string> {
        return this.sidebarElementName.asObservable();
    }

    public get getSideBarBadge$(): Observable<StringKeyValuePair> {
        return this.sidebarBadge.asObservable();
    }

    public get getTicketFilter$(): Observable<string> {
        return this.ticketFilter.asObservable();
    }

    public get getSidebarIndex$(): Observable<string> {
        return this.sidebarIndexSub.asObservable();
    }

    public get isSidebarWidthChanged$(): Observable<boolean> {
        return this.sidebarWidth.asObservable();
    }

    public get renderHeatMap$(): Observable<boolean> {
        zip(
            this.stringOne,
            this.stringTwo,
            this.mttpOne,
            this.mttpTwo
        ).subscribe((_) =>
            this.renderHeatMap.next(_.every((status) => status))
        );
        return this.renderHeatMap.asObservable();
    }

    changeSiteId(siteId: string) {
        this.siteIdList.next(siteId);
    }

    changeUserId(userId: number) {
        this.userIdChanged.next(userId);
    }

    changeEnergyAsset(assetName: string) {
        this.energyAssetChanged.next(assetName);
    }

    changeRefreshChart(refresh: boolean) {
        this.refreshChart.next(refresh);
    }

    enableSelectSite(enableSite: number) {
        this.selectSite.next(enableSite);
    }

    sidebarActiveElement(elementName: string) {
        this.sidebarElementName.next(elementName);
    }

    setSidebarBadge(badge: StringKeyValuePair) {
        this.sidebarBadge.next(badge);
    }

    setNewFilter(filter: string) {
        this.ticketFilter.next(filter);
    }

    setSidebarIndex(newIndex: string) {
        this.sidebarIndexSub.next(newIndex);
    }

    /**
     * Sidebar related rendering for heatmap
     */
    changeSidebarWidth(status: boolean = true) {
        this.sidebarWidth.next(status);
    }

    completeStringOne(status: boolean) {
        this.stringOne.next(status);
    }

    completeStringTwo(status: boolean) {
        this.stringTwo.next(status);
    }

    completeMttpOne(status: boolean) {
        this.mttpOne.next(status);
    }

    completeMttpTwo(status: boolean) {
        this.mttpTwo.next(status);
    }
}
