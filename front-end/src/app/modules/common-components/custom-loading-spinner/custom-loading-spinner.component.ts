import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-loading-spinner',
  templateUrl: './custom-loading-spinner.component.html',
  styleUrls: ['./custom-loading-spinner.component.scss']
})
export class CustomLoadingSpinnerComponent implements OnInit {

  @Input() show = false;

  constructor() { }

  ngOnInit() {
  }

}
