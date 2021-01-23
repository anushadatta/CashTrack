import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CookieKeys } from "./../common/enum";
import { HttpService } from "./../services/http.service";

@Injectable({
    providedIn: "root",
})
export class TicketResolverService implements Resolve<any> {
    constructor(private cookie: CookieService, private http: HttpService) {}

    resolve() {
        const user_id = this.cookie.get(CookieKeys.user_id);
        if (!user_id) console.error("No user_id in ticket resolver");
        const params = { user_id: user_id };
        return this.http.funGetTickets(params).pipe(
            map((tickets) => ({ tickets: tickets.data })),
            catchError((err) => {
                console.error(err);
                const message = `Retrieval error: ${err}`;
                return of({ tickets: null, error: message });
            })
        );
    }
}
