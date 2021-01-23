import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-component',
  templateUrl: './loading-component.component.html',
  styleUrls: ['./loading-component.component.css']
})
export class LoadingComponentComponent implements OnInit {
  imgPath: string = '/assets/img/loading_ellipsis.gif';

  @Input() imgSrc: string;
  @Input() className: string;

  ngOnInit() {
    if (this.imgSrc) {
      this.imgPath = this.imgSrc;
    }
  }
}
