import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'info-alert-dialog',
  templateUrl: './info-alert.component.html',
})
export class InfoAlertDialog implements OnInit {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<InfoAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  sendReply(reply) {
    this.dialogRef.close(reply);
  }

  
}

