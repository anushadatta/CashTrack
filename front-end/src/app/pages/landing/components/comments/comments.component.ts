import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments = [{name: "Mehul Kumar", comment: "Pls pay me fast"}, {name: "Amrita Ravishankar", comment: "Suree"}];
  comment_text="";

  constructor(public dialogRef: MatDialogRef<CommentsComponent>, public dialog: MatDialog) {
   }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getComment() {
    this.comment_text = (<HTMLInputElement>document.getElementById("input-comment")).value;
    console.log(this.comment_text);
  }

}
