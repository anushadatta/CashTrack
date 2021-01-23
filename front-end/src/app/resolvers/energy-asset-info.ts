import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';

import { Resolve } from '@angular/router';
import { forkJoin } from 'rxjs';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  resolve() {
    let protocolList = this.httpService.funGetProtocolList();
    let interfaceList = this.httpService.funGetInterfaceList(); 
    return forkJoin([protocolList, interfaceList]);
  }
}
