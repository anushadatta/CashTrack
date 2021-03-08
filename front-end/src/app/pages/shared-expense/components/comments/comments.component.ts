import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments = [{name: "Mehul Kumar", comment: "Please pay me as soon as possible"}, {name: "Anusha Datta", comment: "Yes! Suree"}];
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
    let comment_obj = {name: 'Anusha Datta', comment: this.comment_text};
    this.comments.push(comment_obj);
  }

}
