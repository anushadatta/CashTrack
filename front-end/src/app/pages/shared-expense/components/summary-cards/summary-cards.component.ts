import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss']
})

export class SummaryCardsComponent implements OnInit {

  @Input() summary;
  constructor() { }

  ngOnInit(): void {
  }

}
