import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogBoxComponent>) { }

  ngOnInit() {
  }

  funOk() {
    this.dialogRef.close();
  }
}
