import { environment } from './../../environments/environment';
import { HttpService } from 'src/app/services/http.service';
import { NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService implements NGXLoggerMonitor{

  constructor(private http: HttpService) { }

  onLog(log: NGXLogInterface) {
    if(log.level >= 5 && environment.production) { 
      this.http.funPostError()
      .subscribe(res => console.log("Error Log saved to server"))
    }
  }
}
