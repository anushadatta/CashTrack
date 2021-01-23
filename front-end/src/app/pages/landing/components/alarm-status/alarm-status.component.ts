import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { ApiResponseType, SiteDetail } from 'src/app/types/common.type';
import { zip } from 'rxjs';

@Component({
  selector: 'app-alarm-status',
  templateUrl: './alarm-status.component.html',
  styleUrls: ['./alarm-status.component.css']
})
export class AlarmStatusComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpService,
    private dialogRef: MatDialogRef<AlarmStatusComponent>,
  ) { }

  user_id: number;
  site_id: number;

  alarmList = [];

  async ngOnInit() {

    this.user_id = this.data['user_id'];
    this.site_id = this.data['site_id'];

    let param = {
      user_id: this.user_id,
      site_id: this.site_id
    };

    const [res, res2] = await zip(
      this.http.funGetSiteDetail(param),
      this.http.funGetAlarmStatus(param)
    ).toPromise();

    if (res.success && res2.success) {

      const [siteDetail] = res.data;
      const alarmStatus = res2.data;

      // alarmStatus.forEach(alarm => {
      for (const alarm of alarmStatus) {
        if (alarm['status'] == 'red' || alarm['status'] == 'yellow') {

          let object = {};
          object['sitename'] = siteDetail.sitename;
          object['site_location'] = siteDetail.site_location;
          object['alarm_cleared'] = alarm.alarm_cleared || 'NA';
          object['alarm_started'] = alarm.alarm_started || 'NA';
          object['asset_id'] = alarm['asset_id'];
          object['inactive_reason'] = 'Communication Failure';

          this.alarmList.push(object);
        }
      }
    }

    // this.http.funGetSiteDetail(param)
    //   .subscribe((siteDetail: ApiResponseType<SiteDetail[]>) => {

    //     this.http.funGetAlarmStatus(param)
    //       .subscribe((alarmStatus: ApiResponseType<any[]>) => {

    //         alarmStatus.forEach(alarm => {

    //           if (alarm['status'] == 'red' || alarm['status'] == 'yellow') {

    //             let object = {};
    //             object['sitename'] = siteDetail[0]['sitename'];
    //             object['site_location'] = siteDetail[0]['site_location'];
    //             object['alarm_cleared'] = alarm['alarm_cleared'] || 'NA';
    //             object['alarm_started'] = alarm['alarm_started'] || 'NA';
    //             object['asset_id'] = alarm['asset_id'];
    //             object['inactive_reason'] = 'Communication Failure';

    //             this.alarmList.push(object);
    //           }
    //         });
    //       });
    //   });
  }

  /**
   * @function funCloseDialog()
   * this function closes dialog
   * @param {undefined}
   * @returns {undefined}
   */
  funCloseDialog() {
    this.dialogRef.close();
  }
}
