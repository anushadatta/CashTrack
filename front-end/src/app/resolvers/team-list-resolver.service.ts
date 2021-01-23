import { CookieKeys } from 'src/app/common/enum';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamListResolverService  implements Resolve<any>{

  constructor(private cookie: CookieService, private http: HttpService) { }
  
  resolve() {
    const user_id = this.cookie.get(CookieKeys.user_id);
    if (!user_id) console.error("No user_id in team list resolver")
    const params = { user_id: user_id}
    return this.http.funGetTeamList(params).pipe(
      map(teamlist => ({ teamList: teamlist.data})),
      catchError(err => {
        console.error(err)
        const message = `Retrival error: ${err}`
        return of({ tickets: null, error: message})
      })
    )
  }

}
