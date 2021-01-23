import { catchError, map } from 'rxjs/operators';
import { HttpService } from "./../services/http.service";
import { CookieKeys } from "./../common/enum";
import { CookieService } from "ngx-cookie-service";
import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SiteListResolverService implements Resolve<any> {
    constructor(private cookie: CookieService, private http: HttpService) {}

    resolve() {
        let user_id = parseInt(this.cookie.get(CookieKeys.user_id));
        if (!user_id) console.error("No user found for site list resolver");
        return this.http.funGetSiteList(user_id)
        .pipe(
          map(siteList => ({siteList: siteList.data})),
          catchError(err => {
            console.error(err)
            const message = `Retrieval error: ${err}`
            return of({siteList: null, error: message})
          })
        );
    }
}
