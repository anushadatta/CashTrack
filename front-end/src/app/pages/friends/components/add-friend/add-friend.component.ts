import { Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  friend_email: string;
  invite: boolean;
}

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})

export class AddFriendComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<AddFriendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  ngOnInit(): void {
  }  

  validateEmail(email) {

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      {
        return (true)
      }
        alert("Please enter a valid email address!")
        return (false)
    }

  addFriend() : void {
    console.log(this.data);

    if (this.validateEmail(this.data.friend_email)) {
      // TODO: SEND EMAIL INVITE TO ADD FRIEND

      // this.dialogRef.close();
      alert("E-mail invite sent to " + this.data.friend_email);

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

