import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject } from "rxjs";
import { CookieKeys } from "src/app/common/enum"
@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private themEl: HTMLLinkElement;
  private head: HTMLHeadElement;
  private clientId = new BehaviorSubject<string>('');
  clientId$ = this.clientId.asObservable();

  private resyncDemoId = "11";
  private customClientIds = ['103', '14']
  
  private custom = new BehaviorSubject(false);
  customTheme = this.custom.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cookie: CookieService
  ) {}

  setTheme() {
    // Create Link and get Head
    this.themEl = this.document.createElement("link");
    this.head = this.document.getElementsByTagName("head")[0];
    const id = this.cookie.get(CookieKeys.user_id);

    this.themEl.rel = "stylesheet";
    this.themEl.type = "text/css";

    if (id === this.resyncDemoId || id === null) {
      this.themEl.href = "master.css";
    } else if (this.customClientIds.includes(id)) {
      this.themEl.href = id + ".css";
      this.custom.next(true);
      this.clientId.next(id);
    } else {
      return;
    }

    const links = this.head.getElementsByTagName("link"),
      style = this.head.getElementsByTagName[0];

    // Check if the same stylesheet is already in the DOM

    let isLoaded = false;
    for (let i = 0; i < links.length; i++) {
      const node = links[i];
      if (node.href.indexOf(this.themEl.href) > -1) {
        isLoaded = true;
      }
    }

    if (isLoaded) {
      return;
    }
    this.head.insertBefore(this.themEl, style);
  }

  removeTheme() {
    if (this.head && this.themEl) {
      this.custom.next(false);
      try {
        this.head.removeChild(this.themEl);
      } catch (e) {
        // console.error(e);
      }
    }
  }
}
